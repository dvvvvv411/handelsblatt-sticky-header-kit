
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Plus, PenTool } from 'lucide-react';
import ArticleForm from './ArticleForm';

interface CollapsibleArticleFormProps {
  onSuccess: () => void;
}

const CollapsibleArticleForm: React.FC<CollapsibleArticleFormProps> = ({ onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-900">
                    Create New Article
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-1">
                    {isOpen ? 'Click to collapse the form' : 'Click to expand and create a new article'}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!isOpen && (
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    New
                  </div>
                )}
                {isOpen ? (
                  <ChevronUp className="w-6 h-6 text-gray-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-500" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="pt-0 bg-white">
            <div className="border-t border-gray-100 pt-6">
              <ArticleForm onSuccess={onSuccess} />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CollapsibleArticleForm;
