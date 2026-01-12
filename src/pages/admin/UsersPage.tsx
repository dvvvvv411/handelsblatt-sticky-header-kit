import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, Shield, ShieldOff, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  roles: string[];
}

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, full_name, created_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const usersWithRoles: UserProfile[] = (profiles || []).map(profile => {
        const roles = (userRoles || [])
          .filter(role => role.user_id === profile.id)
          .map(role => role.role);
        
        return {
          ...profile,
          roles
        };
      });

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId: string, currentRoles: string[]) => {
    const isCurrentlyAdmin = currentRoles.includes('admin');
    
    try {
      if (!isCurrentlyAdmin) {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
        toast.success('User promoted to admin');
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
        toast.success('Admin role removed');
      }

      fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast.error('Failed to update user role');
    }
  };

  const adminCount = users.filter(u => u.roles.includes('admin')).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
        <p className="text-slate-500 mt-1">Manage users and their roles</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Total Users</p>
              {loading ? (
                <div className="h-8 w-16 bg-slate-100 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-3xl font-bold text-slate-900 mt-1">{users.length}</p>
              )}
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Administrators</p>
              {loading ? (
                <div className="h-8 w-16 bg-slate-100 rounded animate-pulse mt-2"></div>
              ) : (
                <p className="text-3xl font-bold text-slate-900 mt-1">{adminCount}</p>
              )}
            </div>
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">All Users</h2>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">No users yet</h3>
            <p className="text-slate-500">Users will appear here when they sign up.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((userProfile) => {
                  const isUserAdmin = userProfile.roles.includes('admin');
                  const isCurrentUser = userProfile.id === user?.id;
                  
                  return (
                    <tr key={userProfile.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-900">{userProfile.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-slate-600">{userProfile.full_name || '-'}</p>
                      </td>
                      <td className="py-4 px-4">
                        <Badge 
                          variant={isUserAdmin ? 'default' : 'secondary'}
                          className={isUserAdmin ? 'bg-slate-900' : 'bg-slate-200 text-slate-600'}
                        >
                          {isUserAdmin ? 'Admin' : 'User'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-slate-500 flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {new Date(userProfile.created_at).toLocaleDateString('de-DE')}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <Button
                          variant={isUserAdmin ? "outline" : "default"}
                          size="sm"
                          onClick={() => toggleUserRole(userProfile.id, userProfile.roles)}
                          disabled={isCurrentUser}
                          className={!isUserAdmin ? 'bg-slate-900 hover:bg-slate-800' : ''}
                        >
                          {isUserAdmin ? (
                            <>
                              <ShieldOff className="w-4 h-4 mr-1.5" />
                              Remove Admin
                            </>
                          ) : (
                            <>
                              <Shield className="w-4 h-4 mr-1.5" />
                              Make Admin
                            </>
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
