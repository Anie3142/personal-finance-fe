import { Building2, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Bank {
  id: string;
  name: string;
  logo: string;
}

const banks: Bank[] = [
  { id: 'gtbank', name: 'GTBank', logo: 'GT' },
  { id: 'access', name: 'Access Bank', logo: 'AC' },
  { id: 'zenith', name: 'Zenith Bank', logo: 'ZB' },
  { id: 'firstbank', name: 'First Bank', logo: 'FB' },
  { id: 'uba', name: 'UBA', logo: 'UB' },
  { id: 'fidelity', name: 'Fidelity Bank', logo: 'FD' },
  { id: 'sterling', name: 'Sterling Bank', logo: 'ST' },
  { id: 'wema', name: 'Wema Bank', logo: 'WM' },
  { id: 'fcmb', name: 'FCMB', logo: 'FC' },
  { id: 'union', name: 'Union Bank', logo: 'UN' },
];

type ConnectionState = 'select' | 'connecting' | 'success' | 'error';

interface MonoConnectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (bankId: string) => void;
}

export function MonoConnectModal({
  open,
  onOpenChange,
  onSuccess,
}: MonoConnectModalProps) {
  const [state, setState] = useState<ConnectionState>('select');
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setState('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      setState(success ? 'success' : 'error');
      if (success && onSuccess) {
        onSuccess(bank.id);
      }
    }, 2000);
  };

  const handleClose = () => {
    onOpenChange(false);
    // Reset state after modal closes
    setTimeout(() => {
      setState('select');
      setSelectedBank(null);
    }, 200);
  };

  const handleRetry = () => {
    setState('select');
    setSelectedBank(null);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Connect Your Bank
          </DialogTitle>
          <DialogDescription>
            Securely connect your bank account via Mono Open Banking
          </DialogDescription>
        </DialogHeader>

        {state === 'select' && (
          <ScrollArea className="h-80">
            <div className="grid grid-cols-2 gap-3">
              {banks.map((bank) => (
                <button
                  key={bank.id}
                  onClick={() => handleBankSelect(bank)}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {bank.logo}
                  </div>
                  <span className="text-sm font-medium text-center">{bank.name}</span>
                </button>
              ))}
            </div>
          </ScrollArea>
        )}

        {state === 'connecting' && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="font-medium">Connecting to {selectedBank?.name}...</p>
            <p className="text-sm text-muted-foreground mt-1">
              This may take a few moments
            </p>
          </div>
        )}

        {state === 'success' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <p className="font-medium">Successfully Connected!</p>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              Your {selectedBank?.name} account has been linked
            </p>
            <Button className="mt-6" onClick={handleClose}>
              Done
            </Button>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <p className="font-medium">Connection Failed</p>
            <p className="text-sm text-muted-foreground mt-1 text-center">
              We couldn't connect to {selectedBank?.name}. Please try again.
            </p>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleRetry}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {state === 'select' && (
          <div className="text-center text-xs text-muted-foreground mt-2">
            🔒 Your data is encrypted with 256-bit security
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
