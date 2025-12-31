import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Category {
  id: string;
  name: string;
  emoji: string;
  type: 'expense' | 'income';
}

const categories: Category[] = [
  { id: '1', name: 'Food & Dining', emoji: '🍕', type: 'expense' },
  { id: '2', name: 'Transportation', emoji: '🚗', type: 'expense' },
  { id: '3', name: 'Shopping', emoji: '🛍️', type: 'expense' },
  { id: '4', name: 'Bills & Utilities', emoji: '💡', type: 'expense' },
  { id: '5', name: 'Entertainment', emoji: '🎬', type: 'expense' },
  { id: '6', name: 'Healthcare', emoji: '🏥', type: 'expense' },
  { id: '7', name: 'Education', emoji: '📚', type: 'expense' },
  { id: '8', name: 'Personal Care', emoji: '💅', type: 'expense' },
  { id: '9', name: 'Home', emoji: '🏠', type: 'expense' },
  { id: '10', name: 'Travel', emoji: '✈️', type: 'expense' },
  { id: '11', name: 'Gifts & Donations', emoji: '🎁', type: 'expense' },
  { id: '12', name: 'Business', emoji: '💼', type: 'expense' },
  { id: '13', name: 'Fees & Charges', emoji: '🏦', type: 'expense' },
  { id: '14', name: 'Salary', emoji: '💰', type: 'income' },
  { id: '15', name: 'Freelance', emoji: '💻', type: 'income' },
  { id: '16', name: 'Investments', emoji: '📈', type: 'income' },
  { id: '17', name: 'Gifts Received', emoji: '🎁', type: 'income' },
  { id: '18', name: 'Refunds', emoji: '💵', type: 'income' },
  { id: '19', name: 'Other Income', emoji: '📥', type: 'income' },
];

interface CategorySelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (category: Category) => void;
  type?: 'expense' | 'income' | 'all';
}

export function CategorySelectorModal({
  open,
  onOpenChange,
  onSelect,
  type = 'all',
}: CategorySelectorModalProps) {
  const [search, setSearch] = useState('');

  const filteredCategories = categories.filter((cat) => {
    const matchesType = type === 'all' || cat.type === type;
    const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleSelect = (category: Category) => {
    onSelect(category);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Category</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <ScrollArea className="h-72">
          <div className="grid grid-cols-2 gap-2">
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleSelect(category)}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-secondary/80 transition-colors text-left"
              >
                <span className="text-xl">{category.emoji}</span>
                <span className="text-sm font-medium truncate">{category.name}</span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
