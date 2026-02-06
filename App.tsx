import React, { useState } from 'react';
import { Tab } from './types';
import { QuestBooking } from './components/QuestBooking';
import { ChromaticOrdering } from './components/ChromaticOrdering';
import { InfiniteDiscovery } from './components/InfiniteDiscovery';
import { Sparkles, Map, Palette } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.QUEST);

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Tab Navigation */}
      <nav className="flex-none bg-stone-950 border-b border-stone-800 z-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center justify-center h-16 gap-8">
            <button
              onClick={() => setActiveTab(Tab.QUEST)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeTab === Tab.QUEST 
                  ? 'bg-quest-terracotta text-white' 
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Quest Booking</span>
            </button>
            
            <button
              onClick={() => setActiveTab(Tab.CHROMATIC)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeTab === Tab.CHROMATIC 
                  ? 'bg-purple-600 text-white' 
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Chromatic Order</span>
            </button>
            
            <button
              onClick={() => setActiveTab(Tab.INFINITE)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                activeTab === Tab.INFINITE 
                  ? 'bg-gold text-black' 
                  : 'text-stone-400 hover:text-white hover:bg-stone-900'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Infinite Scroll</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {activeTab === Tab.QUEST && <QuestBooking />}
        {activeTab === Tab.CHROMATIC && <ChromaticOrdering />}
        {activeTab === Tab.INFINITE && <InfiniteDiscovery />}
      </main>
    </div>
  );
};

export default App;
