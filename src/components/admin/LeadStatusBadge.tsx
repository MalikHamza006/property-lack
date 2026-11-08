import React from 'react';
import { LeadStatus } from '../../types/lead';

interface LeadStatusBadgeProps {
  status: LeadStatus;
  onChangeStatus?: (newStatus: LeadStatus) => void;
  interactive?: boolean;
}

export const LeadStatusBadge: React.FC<LeadStatusBadgeProps> = ({
  status,
  onChangeStatus,
  interactive = true
}) => {
  const getColors = (st: LeadStatus) => {
    switch (st) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Interested':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Converted':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Lost':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  if (!interactive || !onChangeStatus) {
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getColors(status)}`}>
        {status}
      </span>
    );
  }

  return (
    <select
      value={status}
      onChange={(e) => onChangeStatus(e.target.value as LeadStatus)}
      className={`text-xs font-bold rounded-lg border px-2.5 py-1 cursor-pointer focus:outline-none transition-colors ${getColors(status)}`}
    >
      <option value="New">● New</option>
      <option value="Contacted">● Contacted</option>
      <option value="Interested">● Interested</option>
      <option value="Converted">● Converted</option>
      <option value="Lost">● Lost</option>
    </select>
  );
};
