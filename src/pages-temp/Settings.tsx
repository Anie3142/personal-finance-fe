import { User, Bell, Shield, CreditCard, Moon, Building2, Database, Monitor, Smartphone, LogOut, Crown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { DeleteConfirmationModal } from '@/components/modals';
import { useState } from 'react';

const activeSessions = [
  { id: '1', device: 'Chrome on Windows', location: 'Lagos, Nigeria', lastActive: 'Active now', current: true },
  { id: '2', device: 'Safari on iPhone', location: 'Lagos, Nigeria', lastActive: '2 hours ago', current: false },
  { id: '3', device: 'Firefox on MacOS', location: 'Abuja, Nigeria', lastActive: '3 days ago', current: false },
];

export default function Settings() {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <div className="container py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>First name</Label><Input defaultValue="Chidi" /></div>
              <div className="space-y-2"><Label>Last name</Label><Input defaultValue="Okonkwo" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue="chidi@example.com" disabled /></div>
            <div className="space-y-2"><Label>Phone number</Label><Input placeholder="+234 800 000 0000" /></div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Moon className="h-5 w-5" />Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><Label>Currency</Label><p className="text-sm text-muted-foreground">Default currency for display</p></div>
              <Select defaultValue="NGN"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="NGN">🇳🇬 NGN</SelectItem><SelectItem value="USD">🇺🇸 USD</SelectItem><SelectItem value="GBP">🇬🇧 GBP</SelectItem></SelectContent></Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Date format</Label><p className="text-sm text-muted-foreground">How dates are displayed</p></div>
              <Select defaultValue="dmy"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dmy">DD/MM/YYYY</SelectItem><SelectItem value="mdy">MM/DD/YYYY</SelectItem><SelectItem value="ymd">YYYY-MM-DD</SelectItem></SelectContent></Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Start of week</Label><p className="text-sm text-muted-foreground">First day of the week</p></div>
              <Select defaultValue="mon"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="mon">Monday</SelectItem><SelectItem value="sun">Sunday</SelectItem></SelectContent></Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Budget start day</Label><p className="text-sm text-muted-foreground">When your monthly budget resets</p></div>
              <Select defaultValue="1"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1">1st of month</SelectItem><SelectItem value="25">25th (salary day)</SelectItem></SelectContent></Select>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div><Label>Theme</Label><p className="text-sm text-muted-foreground">Choose dark or light mode</p></div>
              <Select defaultValue="dark"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dark">Dark</SelectItem><SelectItem value="light">Light</SelectItem><SelectItem value="system">System</SelectItem></SelectContent></Select>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Crown className="h-5 w-5" />Subscription</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-semibold flex items-center gap-2">Free Plan <Badge variant="secondary">Current</Badge></p>
                  <p className="text-sm text-muted-foreground">1 bank connection, basic features</p>
                </div>
              </div>
              <Button>Upgrade to Premium</Button>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Billing History</p>
              <p className="text-sm text-muted-foreground">No billing history available</p>
            </div>
          </CardContent>
        </Card>

        {/* Connected Banks */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" />Connected Banks</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-3"><span className="font-bold text-primary">GT</span><span>GTBank Savings</span></div>
              <div className="flex items-center gap-2"><span className="text-sm text-success">Connected</span><Button variant="outline" size="sm">Sync</Button></div>
            </div>
            <Button variant="outline" className="w-full">+ Connect New Bank</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between"><Label>Budget alerts</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>Bill reminders</Label><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><Label>Weekly summary email</Label><Switch /></div>
            <div className="flex items-center justify-between"><Label>Push notifications</Label><Switch defaultChecked /></div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Security</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button variant="outline">Change Password</Button>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <Separator />
            <div>
              <p className="text-sm font-medium mb-3">Active Sessions</p>
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      {session.device.includes('iPhone') ? <Smartphone className="h-5 w-5" /> : <Monitor className="h-5 w-5" />}
                      <div>
                        <p className="font-medium flex items-center gap-2">
                          {session.device}
                          {session.current && <Badge variant="outline" className="text-xs">This device</Badge>}
                        </p>
                        <p className="text-sm text-muted-foreground">{session.location} • {session.lastActive}</p>
                      </div>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <LogOut className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" className="text-destructive hover:text-destructive">Log Out All Other Devices</Button>
          </CardContent>
        </Card>

        {/* Data & Privacy */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" />Data & Privacy</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline">Export All Data</Button>
            <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>Delete Account</Button>
          </CardContent>
        </Card>
      </div>

      <DeleteConfirmationModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Delete Account"
        description="This will permanently delete your account and all associated data. This action cannot be undone."
        confirmText="DELETE"
        requireConfirmation
        onConfirm={() => console.log('Account deleted')}
      />
    </div>
  );
}
