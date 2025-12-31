import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  requireConfirmation?: boolean;
  onConfirm: () => void;
}

export function DeleteConfirmationModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'DELETE',
  requireConfirmation = true,
  onConfirm,
}: DeleteConfirmationModalProps) {
  const [inputValue, setInputValue] = useState('');
  const [understood, setUnderstood] = useState(false);

  const canDelete = requireConfirmation 
    ? inputValue === confirmText && understood 
    : true;

  const handleConfirm = () => {
    if (canDelete) {
      onConfirm();
      onOpenChange(false);
      setInputValue('');
      setUnderstood(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setInputValue('');
      setUnderstood(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
          </div>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {requireConfirmation && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>
                Type <span className="font-mono font-bold text-destructive">{confirmText}</span> to confirm
              </Label>
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={confirmText}
                className="font-mono"
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="understand"
                checked={understood}
                onCheckedChange={(checked) => setUnderstood(checked as boolean)}
              />
              <Label htmlFor="understand" className="text-sm leading-relaxed cursor-pointer">
                I understand this action is irreversible and all associated data will be permanently deleted.
              </Label>
            </div>
          </div>
        )}

        <AlertDialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={!canDelete}
          >
            Delete Permanently
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
