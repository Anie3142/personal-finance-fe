import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const expenseCategories = [
  { id: '1', name: 'Food & Dining', emoji: '🍕', color: '#f97316', count: 45, system: true },
  { id: '2', name: 'Transportation', emoji: '🚗', color: '#3b82f6', count: 23, system: true },
  { id: '3', name: 'Shopping', emoji: '🛍️', color: '#ec4899', count: 12, system: true },
  { id: '4', name: 'Bills & Utilities', emoji: '💡', color: '#eab308', count: 8, system: true },
  { id: '5', name: 'Entertainment', emoji: '🎬', color: '#8b5cf6', count: 15, system: true },
  { id: '6', name: 'Healthcare', emoji: '🏥', color: '#ef4444', count: 3, system: true },
  { id: '7', name: 'Education', emoji: '📚', color: '#06b6d4', count: 5, system: true },
  { id: '8', name: 'Personal Care', emoji: '💅', color: '#f472b6', count: 7, system: true },
  { id: '9', name: 'Home', emoji: '🏠', color: '#84cc16', count: 2, system: true },
  { id: '10', name: 'Travel', emoji: '✈️', color: '#0ea5e9', count: 1, system: true },
  { id: '11', name: 'Gifts & Donations', emoji: '🎁', color: '#a855f7', count: 4, system: true },
  { id: '12', name: 'Business', emoji: '💼', color: '#6366f1', count: 6, system: true },
  { id: '13', name: 'Fees & Charges', emoji: '🏦', color: '#71717a', count: 9, system: true },
  { id: '14', name: 'Uncategorized', emoji: '❓', color: '#9ca3af', count: 23, system: true },
];

const incomeCategories = [
  { id: '101', name: 'Salary', emoji: '💰', color: '#10b981', count: 12, system: true },
  { id: '102', name: 'Freelance', emoji: '💻', color: '#14b8a6', count: 5, system: true },
  { id: '103', name: 'Investments', emoji: '📈', color: '#06b6d4', count: 3, system: true },
  { id: '104', name: 'Gifts Received', emoji: '🎁', color: '#a855f7', count: 2, system: true },
  { id: '105', name: 'Refunds', emoji: '💵', color: '#22c55e', count: 4, system: true },
  { id: '106', name: 'Other Income', emoji: '📥', color: '#84cc16', count: 1, system: true },
];

const customCategories = [
  { id: '201', name: 'Jollof Rice Fund', emoji: '🍚', color: '#f97316', count: 8, system: false },
  { id: '202', name: 'Suya Money', emoji: '🥩', color: '#ef4444', count: 4, system: false },
];

export default function Categories() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Organize your transactions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>Add a custom category for your transactions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input placeholder="e.g., Side Hustle" />
              </div>
              <div className="space-y-2">
                <Label>Emoji</Label>
                <div className="flex gap-2">
                  {['💰', '🎉', '🏋️', '🎮', '📱', '☕'].map((emoji) => (
                    <button
                      key={emoji}
                      className="h-10 w-10 rounded-lg bg-secondary hover:bg-secondary/80 text-xl flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Color</Label>
                <div className="flex gap-2">
                  {['#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#ef4444'].map((color) => (
                    <button
                      key={color}
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Create Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="expense" className="space-y-6">
        <TabsList>
          <TabsTrigger value="expense">Expense Categories</TabsTrigger>
          <TabsTrigger value="income">Income Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="expense" className="space-y-6">
          {/* System Categories */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">System Categories</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {expenseCategories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>

          {/* Custom Categories */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Custom Categories</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {customCategories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="income">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {incomeCategories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CategoryCard({ category }: { category: { id: string; name: string; emoji: string; color: string; count: number; system: boolean } }) {
  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-lg flex items-center justify-center text-xl"
              style={{ backgroundColor: `${category.color}20` }}
            >
              {category.emoji}
            </div>
            <div>
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-muted-foreground">{category.count} transactions</p>
            </div>
          </div>
          {!category.system && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
          {category.system && (
            <Badge variant="secondary" className="text-xs">System</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
