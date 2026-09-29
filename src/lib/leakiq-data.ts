export type Risk = 'Low' | 'Medium' | 'High' | 'Critical';
export type CaseStatus = 'New' | 'Under Investigation' | 'Confirmed' | 'Resolved' | 'Dismissed / Legitimate';
export type Case = { id: string; storeId: string; classification: 'Potential Fraud' | 'Potential Leakage' | 'Operational Anomaly'; category: string; title: string; exposure: number; confidence: number; severity: Risk; status: CaseStatus; signal: string };
export const stores = [
  { id:'04', name:'HSR Layout', risk:'Critical' as Risk, score:89, exposure:39200, cases:6, area:'Inventory', change:'+18%' },
  { id:'07', name:'Jayanagar', risk:'High' as Risk, score:76, exposure:31400, cases:4, area:'Procurement', change:'+12%' },
  { id:'03', name:'Whitefield', risk:'High' as Risk, score:71, exposure:28900, cases:3, area:'Payments', change:'+8%' },
  { id:'01', name:'Indiranagar', risk:'Medium' as Risk, score:58, exposure:26500, cases:2, area:'Refunds', change:'−4%' },
  { id:'02', name:'Koramangala', risk:'Medium' as Risk, score:52, exposure:24900, cases:2, area:'Waste', change:'+3%' },
  { id:'05', name:'JP Nagar', risk:'Medium' as Risk, score:48, exposure:22900, cases:2, area:'Inventory', change:'−7%' },
  { id:'06', name:'Marathahalli', risk:'Low' as Risk, score:34, exposure:21700, cases:1, area:'Discounts', change:'−11%' },
  { id:'08', name:'Bellandur', risk:'Low' as Risk, score:29, exposure:19700, cases:1, area:'Production', change:'−6%' },
  { id:'09', name:'Hebbal', risk:'Low' as Risk, score:25, exposure:17400, cases:1, area:'Cash', change:'−9%' },
  { id:'10', name:'Electronic City', risk:'Low' as Risk, score:20, exposure:11400, cases:1, area:'Receiving', change:'−13%' },
];
export const cases: Case[] = [
  { id:'LIQ-00431',storeId:'04',classification:'Potential Leakage',category:'Inventory',title:'Potential Inventory Leakage',exposure:18400,confidence:91,severity:'High',status:'New',signal:'QC-approved fries rejected without matching disposal, then consumed' },
  { id:'LIQ-00432',storeId:'07',classification:'Potential Leakage',category:'Procurement',title:'Potential Procurement Leakage',exposure:12700,confidence:86,severity:'High',status:'Under Investigation',signal:'Received quantity differs from central purchase order' },
  { id:'LIQ-00433',storeId:'03',classification:'Potential Leakage',category:'Payments',title:'Potential Payment Leakage',exposure:9800,confidence:79,severity:'Medium',status:'New',signal:'Personal UPI reference recorded on a completed order' },
  { id:'LIQ-00434',storeId:'04',classification:'Operational Anomaly',category:'Waste',title:'Excessive Waste Variance',exposure:7400,confidence:83,severity:'High',status:'New',signal:'Waste rate exceeded regional benchmark across three shifts' },
  { id:'LIQ-00435',storeId:'01',classification:'Potential Fraud',category:'Refunds',title:'Refund Without Return',exposure:6900,confidence:77,severity:'Medium',status:'Under Investigation',signal:'Refund recorded with no linked return entry' },
  { id:'LIQ-00436',storeId:'02',classification:'Operational Anomaly',category:'Sales',title:'Post-payment Void Spike',exposure:5200,confidence:74,severity:'Medium',status:'New',signal:'Paid orders voided more often than the regional baseline' },
  { id:'LIQ-00437',storeId:'09',classification:'Operational Anomaly',category:'Payments',title:'Cash Variance',exposure:4100,confidence:72,severity:'Low',status:'New',signal:'Closing cash differs from recorded tender total' },
  { id:'LIQ-00438',storeId:'08',classification:'Operational Anomaly',category:'Production',title:'Production-to-Sales Mismatch',exposure:3800,confidence:76,severity:'Low',status:'New',signal:'Prepared units exceeded sold and discarded quantities' },
  { id:'LIQ-00439',storeId:'04',classification:'Operational Anomaly',category:'Employee Activity',title:'Rejection Activity Variance',exposure:3400,confidence:70,severity:'Medium',status:'New',signal:'Receiving rejection activity differs from store peers' },
  { id:'LIQ-00440',storeId:'05',classification:'Potential Leakage',category:'Inventory',title:'Inventory Consumption Variance',exposure:6100,confidence:81,severity:'Medium',status:'New',signal:'Ingredient consumption exceeds expected recipe usage' },
];
export const drivers = [
  {label:'Inventory', amount:84500}, {label:'Procurement',amount:59200}, {label:'Payments',amount:48700}, {label:'Waste',amount:39100}, {label:'Refunds',amount:31800}, {label:'Discounts',amount:20700},
];
export const money = (value:number) => '₹' + new Intl.NumberFormat('en-IN').format(value);
export const storeFor = (id:string) => stores.find(s => s.id === id) ?? stores[0];
export const riskClass = (risk:string) => risk === 'Critical' || risk === 'High' ? 'risk-high' : risk === 'Medium' ? 'risk-medium' : 'risk-low';
export const timeline = [
  {time:'08:32', title:'Central procurement dispatched', detail:'100 fries packets · shipment PO-7824'},
  {time:'12:18', title:'Store received shipment', detail:'100 packets acknowledged at HSR Layout'},
  {time:'12:25', title:'Central QC passed', detail:'Quality clearance attached to shipment'},
  {time:'12:41', title:'Store recorded rejection', detail:'22 packets marked as quality rejected'},
  {time:'13:02', title:'Return record not found', detail:'No linked return or disposal for 17 packets'},
  {time:'Next day', title:'Inventory consumption recorded', detail:'8 rejected packets appear in subsequent usage'},
];
export const evidence = [
  {number:'01', title:'Unusual rejection rate', value:'22 packets', detail:'Store rejection 22% vs regional 3%', comparison:'7.3× benchmark'},
  {number:'02', title:'Missing disposition', value:'17 packets', detail:'No return or disposal record found', comparison:'Record gap'},
  {number:'03', title:'Subsequent consumption', value:'8 packets', detail:'Rejected SKU later appears in inventory use', comparison:'Linked signal'},
  {number:'04', title:'Activity variance', value:'E104', detail:'Higher rejection activity than store peers', comparison:'Review context'},
];
export const actions = ['Verify physical disposal/return documentation','Verify store receiving records','Review central QC evidence','Review relevant shift activity','Check subsequent inventory consumption'];
export const explorerTabs = ['Orders','Payments','Inventory','Procurement','Receiving','Waste','Production','Refunds'] as const;
export type ExplorerTab = typeof explorerTabs[number];
export const explorerRows: Record<ExplorerTab, {ref:string;store:string;detail:string;amount:string;status:string}[]> = {
 Orders:[{ref:'ORD-28471',store:'HSR Layout',detail:'Table 12 · dine-in',amount:'₹2,340',status:'Completed'},{ref:'ORD-28472',store:'Whitefield',detail:'Online order · UPI',amount:'₹1,860',status:'Review'},{ref:'ORD-28473',store:'Jayanagar',detail:'Counter order',amount:'₹1,245',status:'Completed'}],
 Payments:[{ref:'PAY-99214',store:'Whitefield',detail:'UPI reference mismatch',amount:'₹9,800',status:'Review'},{ref:'PAY-99215',store:'Hebbal',detail:'Cash close variance',amount:'₹4,100',status:'Review'},{ref:'PAY-99216',store:'HSR Layout',detail:'Card settlement',amount:'₹2,890',status:'Matched'}],
 Inventory:[{ref:'INV-48201',store:'HSR Layout',detail:'Fries · rejected SKU consumed',amount:'8 units',status:'Review'},{ref:'INV-48202',store:'JP Nagar',detail:'Oil · recipe variance',amount:'14 L',status:'Review'},{ref:'INV-48203',store:'Indiranagar',detail:'Buns · count matched',amount:'120 units',status:'Matched'}],
 Procurement:[{ref:'PO-7824',store:'HSR Layout',detail:'Fries · central dispatch',amount:'100 units',status:'QC Passed'},{ref:'PO-7825',store:'Jayanagar',detail:'Produce · quantity discrepancy',amount:'80 kg',status:'Review'},{ref:'PO-7826',store:'Bellandur',detail:'Packaging supplies',amount:'250 units',status:'Matched'}],
 Receiving:[{ref:'RCV-4182',store:'HSR Layout',detail:'Fries · 22 rejected',amount:'100 units',status:'Review'},{ref:'RCV-4183',store:'Jayanagar',detail:'Produce · 6 kg missing',amount:'74 kg',status:'Review'},{ref:'RCV-4184',store:'Whitefield',detail:'Beverage stock',amount:'96 units',status:'Matched'}],
 Waste:[{ref:'WST-1882',store:'HSR Layout',detail:'Fries · disposal record absent',amount:'17 units',status:'Review'},{ref:'WST-1883',store:'Koramangala',detail:'Prepared meals',amount:'12 units',status:'Review'},{ref:'WST-1884',store:'Marathahalli',detail:'Vegetables',amount:'4 kg',status:'Recorded'}],
 Production:[{ref:'PRD-2081',store:'Bellandur',detail:'Prepared vs sold variance',amount:'18 units',status:'Review'},{ref:'PRD-2082',store:'HSR Layout',detail:'Fries production batch',amount:'140 units',status:'Recorded'},{ref:'PRD-2083',store:'JP Nagar',detail:'Lunch prep',amount:'92 units',status:'Recorded'}],
 Refunds:[{ref:'RFD-8814',store:'Indiranagar',detail:'Return record not found',amount:'₹6,900',status:'Review'},{ref:'RFD-8815',store:'HSR Layout',detail:'Customer cancellation',amount:'₹1,240',status:'Recorded'},{ref:'RFD-8816',store:'Whitefield',detail:'Duplicate payment',amount:'₹850',status:'Recorded'}],
};
