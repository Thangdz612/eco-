import React from 'react';
import { Sun, Globe, Store, Leaf } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const tabs = [
    {
      id: 'weather' as TabType,
      label: 'Thời tiết',
      icon: Sun,
    },
    {
      id: 'environment' as TabType,
      label: 'Môi trường',
      icon: Globe,
    },
    {
      id: 'enterprise' as TabType,
      label: 'Doanh nghiệp',
      icon: Store,
    },
    {
      id: 'protection' as TabType,
      label: 'Bảo vệ MT',
      icon: Leaf,
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="bg-white dark:bg-[#1E293B] border-t border-[#E2E8F0] dark:border-[#334155] px-3 py-2 flex items-center justify-around select-none z-20 transition-colors"
      aria-label="Điều hướng chính"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        // Custom active colors per tab archetype or primary deep blue/green
        let activeTextColor = 'text-[#0D47A1] dark:text-blue-400';
        if (tab.id === 'protection') {
          activeTextColor = 'text-[#15803D] dark:text-emerald-400';
        } else if (tab.id === 'enterprise') {
          activeTextColor = 'text-[#4338CA] dark:text-indigo-400';
        } else if (tab.id === 'environment') {
          activeTextColor = 'text-[#0284C7] dark:text-sky-400';
        }

        return (
          <button
            key={tab.id}
            type="button"
            id={`tab-button-${tab.id}`}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer min-w-[68px] ${
              isActive
                ? `${activeTextColor}`
                : 'text-[#64748B] dark:text-slate-400 hover:text-[#334155] dark:hover:text-slate-200'
            }`}
          >
            <Icon
              className={`w-6 h-6 mb-1 transition-transform ${
                isActive ? 'scale-110 stroke-[2.2]' : 'stroke-[1.8]'
              }`}
            />
            <span
              className={`text-[12px] tracking-tight whitespace-nowrap leading-none ${
                isActive ? 'font-bold' : 'font-medium'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
