import { getServiceClient } from './client';

/**
 * Get or create a user by GitHub ID
 */
export async function getOrCreateUser(githubId: string, email: string, name: string) {
  const supabase = getServiceClient();
  
  // Try to find existing user
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('github_id', githubId)
    .single();

  if (existingUser) {
    return existingUser;
  }

  // Create new user
  const { data: newUser, error } = await supabase
    .from('users')
    .insert({ github_id: githubId, email, name })
    .select()
    .single();

  if (error) throw error;
  return newUser;
}

/**
 * Create an API key for a user and app
 */
export async function createApiKey(userId: string, appId: string) {
  const supabase = getServiceClient();
  
  const key = `${appId}_${crypto.randomUUID().replace(/-/g, '')}`;
  
  const { data, error } = await supabase
    .from('api_keys')
    .insert({ user_id: userId, app_id: appId, key })
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Track API usage
 */
export async function trackUsage(apiKeyId: string, metadata?: Record<string, unknown>) {
  const supabase = getServiceClient();
  
  const { error } = await supabase
    .from('usage_logs')
    .insert({ api_key_id: apiKeyId, metadata });

  if (error) throw error;
}

/**
 * Check rate limit for an API key
 */
export async function checkRateLimit(apiKey: string, appId: string): Promise<{
  allowed: boolean;
  used: number;
  limit: number;
}> {
  const supabase = getServiceClient();
  
  // Get API key and user plan
  const { data: keyData } = await supabase
    .from('api_keys')
    .select('id, user_id, app_id')
    .eq('key', apiKey)
    .eq('app_id', appId)
    .eq('is_active', true)
    .single();

  if (!keyData) {
    return { allowed: false, used: 0, limit: 0 };
  }

  // Get user's plan for this app
  const { data: planData } = await supabase
    .from('user_plans')
    .select('monthly_limit')
    .eq('user_id', keyData.user_id)
    .eq('app_id', appId)
    .single();

  const limit = planData?.monthly_limit ?? 500;

  // Count usage this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('api_key_id', keyData.id)
    .gte('created_at', startOfMonth.toISOString());

  const used = count ?? 0;

  return {
    allowed: used < limit,
    used,
    limit,
  };
}
