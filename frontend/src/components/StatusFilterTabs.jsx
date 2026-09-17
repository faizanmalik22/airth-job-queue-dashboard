import { STATUSES } from '../constants';

const TABS = ['all', ...STATUSES];

export default function StatusFilterTabs({ active, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {TABS.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          className={`tabs__tab ${active === tab ? 'tabs__tab--active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
