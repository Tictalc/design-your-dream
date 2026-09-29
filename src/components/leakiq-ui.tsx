import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Store, FileSearch, ChartNoAxesCombined, Database, Search, Bell, ChevronDown, ArrowUpRight, ArrowRight, PanelLeftClose, PanelLeftOpen, ShieldCheck, Activity } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { money, riskClass, storeFor, stores, type Case, type Risk } from '@/lib/leakiq-data';

const navigation = [
  {to:'/' as const,label:'Overview',icon:LayoutDashboard},
  {to:'/stores' as const,label:'Stores',icon:Store},
  {to:'/cases' as const,label:'Investigation Cases',icon:FileSearch},
  {to:'/weekly-report' as const,label:'Weekly Report',icon:ChartNoAxesCombined},
  {to:'/data-explorer' as const,label:'Data Explorer',icon:Database},
];
export function AppShell({children}: {children:ReactNode}) {
  const path = useRouterState({select:s=>s.location.pathname});
  const [collapsed,setCollapsed] = useState(false);
  const [search,setSearch] = useState('');
  const [searchOpen,setSearchOpen] = useState(false);
  return <div className="app-shell">
    <aside className={`app-sidebar ${collapsed?'is-collapsed':''}`}>
      <div className="brand-row"><Link to="/" className="brand"><span className="brand-mark"><Activity size={19}/></span>{!collapsed&&<span>Leak<span className="brand-accent">IQ</span></span>}</Link><Button variant="ghost" size="icon" title={collapsed?'Expand sidebar':'Collapse sidebar'} aria-label={collapsed?'Expand sidebar':'Collapse sidebar'} onClick={()=>setCollapsed(!collapsed)}>{collapsed?<PanelLeftOpen size={17}/>:<PanelLeftClose size={17}/>}</Button></div>
      {!collapsed&&<div className="sidebar-caption">WORKSPACE</div>}
      <nav className="side-nav" aria-label="Main navigation">{navigation.map(({to,label,icon:Icon})=><Link key={to} to={to} title={label} className={`nav-item ${path===to || (to==='/stores'&&path.startsWith('/stores/')) || (to==='/cases'&&path.startsWith('/cases/'))?'active':''}`}><Icon size={17}/>{!collapsed&&<span>{label}</span>}</Link>)}</nav>
      <div className="sidebar-bottom">{!collapsed&&<><div className="side-divider"/><div className="sidebar-caption">REGION</div><div className="region-line"><span className="region-dot"/> Bangalore, India</div><div className="sidebar-footnote">10 stores monitored</div></>}<div className="sidebar-security"><ShieldCheck size={17}/>{!collapsed&&<span>Regional intelligence</span>}</div></div>
    </aside>
    <div className="app-main"><header className="topbar"><div className="topbar-context"><span className="topbar-title">Bangalore Region</span><span className="topbar-divider"/><span className="topbar-subtitle">Restaurant Loss Intelligence</span></div><div className="topbar-tools"><div className="global-search"><Search size={15}/><Input value={search} onChange={e=>{setSearch(e.target.value);setSearchOpen(true)}} onFocus={()=>setSearchOpen(true)} onKeyDown={e=>{if(e.key==='Escape')setSearchOpen(false)}} placeholder="Search stores or cases..." aria-label="Search stores or cases" />{searchOpen&&search.trim()&&<div className="search-results"><div className="search-heading">RESULTS</div>{[...(['HSR Layout','Jayanagar','Whitefield'].filter(s=>s.toLowerCase().includes(search.toLowerCase())).map(s=><Link key={s} to="/stores/$storeId" params={{storeId:s==='HSR Layout'?'04':s==='Jayanagar'?'07':'03'}} onClick={()=>setSearchOpen(false)}><Store size={14}/> {s}</Link>)), ...(search.toLowerCase().includes('inventory')||search.toLowerCase().includes('431')?[<Link key="case" to="/cases/$caseId" params={{caseId:'LIQ-00431'}} onClick={()=>setSearchOpen(false)}><FileSearch size={14}/> LIQ-00431 · Inventory leakage</Link>]:[])]}{!['hsr','jayanagar','whitefield','inventory','431'].some(v=>v.includes(search.toLowerCase())||search.toLowerCase().includes(v))&&<span className="search-empty">No matches in sample data</span>}</div>}</div><div className="week-select" title="Reporting week">Sep 21 – 27, 2026 <ChevronDown size={14}/></div><Button variant="ghost" size="icon" title="No new notifications" aria-label="Notifications"><Bell size={17}/></Button><div className="avatar" title="Regional Manager">RM</div></div></header><main className="page-content">{children}</main></div>
  </div>;
}
export function PageHeading({eyebrow,title,description,action}: {eyebrow?:string;title:string;description?:string;action?:ReactNode}) {return <div className="page-heading"><div><div className="eyebrow">{eyebrow??'BANGALORE REGION'} <span className="eyebrow-dot"/> WEEK 39, 2026</div><h1>{title}</h1>{description&&<p>{description}</p>}</div>{action&&<div className="page-actions">{action}</div>}</div>}
export function SectionHeading({title,subtitle,action}: {title:string;subtitle?:string;action?:ReactNode}) {return <div className="section-heading"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div>{action}</div>}
export function Panel({children,className=''}: {children:ReactNode;className?:string}) {return <section className={`panel ${className}`}>{children}</section>}
export function Metric({label,value,change,icon:Icon,tone}: {label:string;value:string;change?:string;icon?:typeof Activity;tone?:string}) {return <div className="metric"><div className="metric-top"><span>{label}</span>{Icon&&<Icon size={17}/>}</div><div className="metric-value">{value}</div>{change&&<div className={`metric-change ${tone??''}`}>{change}</div>}</div>}
export function RiskBadge({risk}: {risk:Risk|string}) {return <span className={`risk-badge ${riskClass(risk)}`}><i/>{risk}</span>}
export function StatusBadge({status}: {status:string}) {return <span className={`status-badge ${status==='New'?'status-new':status==='Under Investigation'?'status-investigating':status==='Confirmed'?'status-confirmed':'status-muted'}`}>{status}</span>}
export function StoreTable({compact=false}: {compact?:boolean}) {return <div className="table-scroll"><table className="data-table"><thead><tr><th>STORE</th><th>RISK LEVEL</th><th>POTENTIAL EXPOSURE</th><th>CASES</th><th>PRIMARY RISK AREA</th><th>WOW CHANGE</th><th></th></tr></thead><tbody>{(compact?stores.slice(0,5):stores).map(s=><tr key={s.id}><td><Link className="table-primary" to="/stores/$storeId" params={{storeId:s.id}}><span className="store-code">{s.id}</span>{s.name}</Link></td><td><RiskBadge risk={s.risk}/></td><td className="number-cell">{money(s.exposure)}</td><td>{s.cases}</td><td>{s.area}</td><td className={s.change.startsWith('+')?'trend-up':'trend-down'}>{s.change}</td><td><Link className="row-arrow" to="/stores/$storeId" params={{storeId:s.id}} aria-label={`View ${s.name}`}><ArrowUpRight size={16}/></Link></td></tr>)}</tbody></table></div>}
export function CaseRows({items}: {items:Case[]}) {return <div className="case-list">{items.map(c=><Link to="/cases/$caseId" params={{caseId:c.id}} key={c.id} className="case-row"><div className="case-indicator"><FileSearch size={18}/></div><div className="case-copy"><span className="case-id">{c.id} <span>· Store {c.storeId} — {storeFor(c.storeId).name}</span></span><strong>{c.title}</strong><small>{c.signal}</small></div><div className="case-end"><span className="case-exposure">{money(c.exposure)}</span><RiskBadge risk={c.severity}/></div><ArrowRight className="case-arrow" size={17}/></Link>)}</div>}
