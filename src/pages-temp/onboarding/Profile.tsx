import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const currencies = [
  { value: 'NGN', label: '🇳🇬 Nigerian Naira (₦)' },
  { value: 'USD', label: '🇺🇸 US Dollar ($)' },
  { value: 'EUR', label: '🇪🇺 Euro (€)' },
  { value: 'GBP', label: '🇬🇧 British Pound (£)' },
  { value: 'GHS', label: '🇬🇭 Ghanaian Cedi (₵)' },
  { value: 'KES', label: '🇰🇪 Kenyan Shilling (KSh)' },
];

const timezones = [
  { value: 'Africa/Lagos', label: 'Africa/Lagos (WAT)' },
  { value: 'Africa/Accra', label: 'Africa/Accra (GMT)' },
  { value: 'Africa/Nairobi', label: 'Africa/Nairobi (EAT)' },
  { value: 'Europe/London', label: 'Europe/London (GMT/BST)' },
  { value: 'America/New_York', label: 'America/New York (EST)' },
];

export default function OnboardingProfile() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currency, setCurrency] = useState('NGN');
  const [timezone, setTimezone] = useState('Africa/Lagos');

  const handleContinue = () => {
    // Save profile data (would go to API)
    router.push('/onboarding/connect');
  };

  const isValid = firstName.trim() && lastName.trim();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link href="/onboarding/welcome" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Link>

        <Card className="border-border/50 bg-card/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Tell us about yourself</CardTitle>
            <CardDescription>We'll use this to personalize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input 
                  id="firstName"
                  placeholder="Chidi"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input 
                  id="lastName"
                  placeholder="Okonkwo"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={handleContinue}
              disabled={!isValid}
              className="w-full h-12"
              size="lg"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <div className="h-2 w-8 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
          <div className="h-2 w-2 rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}
