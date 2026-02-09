import { Command } from 'commander';
import { existsSync, statSync } from 'fs';
import { resolve } from 'path';
import Database from 'better-sqlite3';
import {
  getContextKitDir,
  getDbPath,
  loadConfig,
  isInitialized,
} from '../config/index.js';
import {
  writeData,
  writeMessage,
  writeSuccess,
  writeWarning,
  writeError,
} from '../utils/streams.js';
import { formatPath, formatBold, formatCommand } from '../utils/format.js';

interface DiagnosticResult {
  name: string;
  status: 'ok' | 'warn' | 'error';
  message: string;
  suggestion?: string;
}

interface DoctorSummary {
  initialized: boolean;
  configValid: boolean;
  databaseValid: boolean;
  sourcesCount: number;
  sourcesValid: number;
  chunksIndexed: number;
  issues: DiagnosticResult[];
}

/**
 * Run all diagnostics and return summary
 */
function runDiagnostics(): DoctorSummary {
  const issues: DiagnosticResult[] = [];
  const summary: DoctorSummary = {
    initialized: false,
    configValid: false,
    databaseValid: false,
    sourcesCount: 0,
    sourcesValid: 0,
    chunksIndexed: 0,
    issues: [],
  };

  // Check 1: Initialization
  if (!isInitialized()) {
    issues.push({
      name: 'Initialization',
      status: 'error',
      message: 'ContextKit is not initialized in this directory',
      suggestion: 'Run `contextkit init` to get started',
    });
    summary.issues = issues;
    return summary;
  }
  summary.initialized = true;

  // Check 2: Config file validity
  try {
    const config = loadConfig();
    summary.configValid = true;

    // Check config version
    if (config.version !== 1) {
      issues.push({
        name: 'Config version',
        status: 'warn',
        message: `Config version ${config.version} may not be compatible`,
        suggestion: 'Consider running `contextkit init --force` to update',
      });
    }

    // Check 3: Sources
    summary.sourcesCount = config.sources?.length || 0;

    if (summary.sourcesCount === 0) {
      issues.push({
        name: 'Sources',
        status: 'warn',
        message: 'No sources configured',
        suggestion: 'Add sources with `contextkit source add ./src`',
      });
    } else {
      // Validate each source
      for (const source of config.sources) {
        const sourcePath = resolve(process.cwd(), source.path);

        if (!existsSync(sourcePath)) {
          issues.push({
            name: `Source: ${source.id}`,
            status: 'error',
            message: `Path "${source.path}" does not exist`,
            suggestion: `Remove with \`contextkit source remove ${source.id}\` or fix the path`,
          });
        } else {
          summary.sourcesValid++;

          // Check if it's a directory
          const stats = statSync(sourcePath);
          if (!stats.isDirectory()) {
            issues.push({
              name: `Source: ${source.id}`,
              status: 'warn',
              message: `Path "${source.path}" is a file, not a directory`,
            });
          }
        }
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    issues.push({
      name: 'Config',
      status: 'error',
      message: `Failed to load config: ${errorMessage}`,
      suggestion: 'Check your .contextkit/config.yaml for syntax errors',
    });
    summary.issues = issues;
    return summary;
  }

  // Check 4: Database
  const dbPath = getDbPath();
  if (!existsSync(dbPath)) {
    issues.push({
      name: 'Database',
      status: 'warn',
      message: 'Database file does not exist',
      suggestion: 'Run `contextkit index` to create the index',
    });
  } else {
    try {
      const db = new Database(dbPath, { readonly: true });

      // Check table exists
      const tableCheck = db
        .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='chunks'")
        .get();

      if (!tableCheck) {
        issues.push({
          name: 'Database',
          status: 'error',
          message: 'Database is missing the chunks table',
          suggestion: 'Run `contextkit init --force` to reinitialize',
        });
      } else {
        // Count chunks
        const countResult = db.prepare('SELECT COUNT(*) as count FROM chunks').get() as {
          count: number;
        };
        summary.chunksIndexed = countResult.count;
        summary.databaseValid = true;

        if (summary.chunksIndexed === 0) {
          issues.push({
            name: 'Index',
            status: 'warn',
            message: 'No chunks indexed yet',
            suggestion: 'Run `contextkit index` to index your sources',
          });
        }
      }

      db.close();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      issues.push({
        name: 'Database',
        status: 'error',
        message: `Failed to open database: ${errorMessage}`,
        suggestion: 'Database may be corrupted. Try `contextkit init --force`',
      });
    }
  }

  summary.issues = issues;
  return summary;
}

/**
 * Format diagnostic result for display
 */
function formatDiagnostic(result: DiagnosticResult): void {
  switch (result.status) {
    case 'ok':
      writeSuccess(`${result.name}: ${result.message}`);
      break;
    case 'warn':
      writeWarning(`${result.name}: ${result.message}`);
      if (result.suggestion) {
        writeMessage(`  └─ ${result.suggestion}`);
      }
      break;
    case 'error':
      writeError(`${result.name}: ${result.message}`);
      if (result.suggestion) {
        writeMessage(`  └─ ${result.suggestion}`);
      }
      break;
  }
}

export const doctorCommand = new Command('doctor')
  .description('Diagnose and troubleshoot ContextKit issues')
  .action(async (_options, command) => {
    const summary = runDiagnostics();

    // Check for --json from parent command (global option)
    const globalOpts = command.parent?.opts() ?? {};
    if (globalOpts.json) {
      writeData(JSON.stringify(summary, null, 2));
      return;
    }

    writeMessage('');
    writeMessage(formatBold('🩺 ContextKit Doctor'));
    writeMessage('Running diagnostics...');
    writeMessage('');

    // Display summary
    writeMessage(formatBold('Summary:'));
    writeMessage(`  Directory: ${formatPath(getContextKitDir())}`);
    writeMessage(`  Initialized: ${summary.initialized ? '✓' : '✗'}`);

    if (summary.initialized) {
      writeMessage(`  Config valid: ${summary.configValid ? '✓' : '✗'}`);
      writeMessage(`  Database valid: ${summary.databaseValid ? '✓' : '✗'}`);
      writeMessage(`  Sources: ${summary.sourcesValid}/${summary.sourcesCount} valid`);
      writeMessage(`  Chunks indexed: ${summary.chunksIndexed.toLocaleString()}`);
    }

    writeMessage('');

    // Display issues
    if (summary.issues.length === 0) {
      writeSuccess('All checks passed! ContextKit is healthy.');
      writeMessage('');
      writeMessage(`Run ${formatCommand('contextkit select "your query"')} to find context.`);
    } else {
      const errors = summary.issues.filter((i) => i.status === 'error');
      const warnings = summary.issues.filter((i) => i.status === 'warn');

      writeMessage(formatBold('Issues found:'));
      writeMessage('');

      for (const issue of summary.issues) {
        formatDiagnostic(issue);
      }

      writeMessage('');

      if (errors.length > 0) {
        writeError(`${errors.length} error(s), ${warnings.length} warning(s)`);
        writeMessage('Please fix the errors above before using ContextKit.');
      } else {
        writeWarning(`${warnings.length} warning(s)`);
        writeMessage('ContextKit should work, but consider addressing the warnings above.');
      }
    }

    writeMessage('');
  });
