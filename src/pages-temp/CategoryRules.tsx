import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Pencil, Trash2, ArrowRight, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const rules = [
  { id: '1', pattern: 'Uber', matchType: 'contains', category: 'Transportation', categoryEmoji: '🚗', applied: 47, active: true },
  { id: '2', pattern: 'Bolt', matchType: 'contains', category: 'Transportation', categoryEmoji: '🚗', applied: 23, active: true },
  { id: '3', pattern: 'Netflix', matchType: 'exact', category: 'Entertainment', categoryEmoji: '🎬', applied: 12, active: true },
  { id: '4', pattern: 'Shoprite', matchType: 'contains', category: 'Food & Dining', categoryEmoji: '🍕', applied: 34, active: true },
  { id: '5', pattern: 'MTN', matchType: 'starts_with', category: 'Bills & Utilities', categoryEmoji: '💡', applied: 15, active: true },
  { id: '6', pattern: 'Jumia', matchType: 'contains', category: 'Shopping', categoryEmoji: '🛍️', applied: 8, active: false },
];

export default function CategoryRules() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/categories">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Category Rules</h1>
          <p className="text-muted-foreground">Auto-categorize transactions based on patterns</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Rule</DialogTitle>
              <DialogDescription>Automatically categorize matching transactions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Match Type</Label>
                <Select defaultValue="contains">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="starts_with">Starts with</SelectItem>
                    <SelectItem value="exact">Exact match</SelectItem>
                    <SelectItem value="regex">Regex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pattern</Label>
                <Input placeholder="e.g., Uber, Netflix" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">🍕 Food & Dining</SelectItem>
                    <SelectItem value="transport">🚗 Transportation</SelectItem>
                    <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                    <SelectItem value="bills">💡 Bills & Utilities</SelectItem>
                    <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="apply-existing" />
                <Label htmlFor="apply-existing">Apply to existing transactions</Label>
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Create Rule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Rules list */}
      <div className="space-y-3">
        {rules.map((rule) => (
          <Card key={rule.id} className={rule.active ? '' : 'opacity-60'}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono">
                      {rule.matchType === 'contains' && 'Contains'}
                      {rule.matchType === 'starts_with' && 'Starts with'}
                      {rule.matchType === 'exact' && 'Exact'}
                      {rule.matchType === 'regex' && 'Regex'}
                    </Badge>
                    <span className="font-medium">"{rule.pattern}"</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{rule.categoryEmoji}</span>
                    <span>{rule.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Applied to {rule.applied} transactions
                  </span>
                  <Switch checked={rule.active} />
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {rules.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No rules yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Create rules to automatically categorize your transactions
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add your first rule
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
