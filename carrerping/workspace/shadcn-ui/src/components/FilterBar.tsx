import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { categories, companies } from '@/lib/mockData';

interface FilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedCompany: string;
  setSelectedCompany: (company: string) => void;
}

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedCompany,
  setSelectedCompany
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
          <Input
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 md:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-slate-700">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-full sm:w-[180px] bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {companies.map((company) => (
                <SelectItem key={company} value={company} className="text-white hover:bg-slate-700">
                  {company}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}