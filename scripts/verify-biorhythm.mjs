// 3層合成スコアでバイオリズムが多様に分布するか確認
const MONTH_OFFSET = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
function isLeapYear(y){return (y%4===0&&y%100!==0)||y%400===0;}
function calcKin(y,m,d){
  let dd=d;if(m===2&&d===29)dd=28;
  const ym=(((y-2016)%52)+52)%52;
  let k=(12+ym*365+MONTH_OFFSET[m-1]+dd)%260;
  if(k<=0)k+=260;
  if(isLeapYear(y)&&m>=3)k=k===260?1:k+1;
  return k;
}
function sealOf(k){const r=k%20;return r===0?20:r;}
function toneOf(k){const r=k%13;return r===0?13:r;}
function colorOf(s){return ["red","white","blue","yellow"][(s-1)%4];}

function detect(u,o){
  if(u===o)return"same";
  if(u+o===261)return"occult";
  const us=sealOf(u),os=sealOf(o),ut=toneOf(u),ot=toneOf(o);
  if(ut===ot&&Math.abs(us-os)===10)return"antipode";
  if(ut===ot)return"guide";
  if(colorOf(us)===colorOf(os))return"analog";
  return"neutral";
}

const RS={same:6,guide:4,occult:3,analog:1,neutral:0,antipode:-3};
const TS={1:-1,2:-2,3:0,4:1,5:2,6:1,7:3,8:3,9:2,10:2,11:-2,12:1,13:0};
const CS={red:1,white:-1,blue:-2,yellow:2};

const birth={year:1990,month:7,day:7};
const userKin=calcKin(birth.year,birth.month,birth.day);
console.log(`User KIN: ${userKin} (seal=${sealOf(userKin)}, tone=${toneOf(userKin)}, color=${colorOf(sealOf(userKin))})`);
console.log("");
console.log("Year  Age  KIN  Tone  Color   Rel       R   T   C  Total");
console.log("-".repeat(64));
const counts={};
for(let y=2006;y<=2046;y++){
  const k=calcKin(y,birth.month,birth.day);
  const t=toneOf(k),s=sealOf(k),c=colorOf(s);
  const rel=detect(userKin,k);
  const rscore=RS[rel],tscore=TS[t],cscore=CS[c];
  const total=rscore+tscore+cscore;
  counts[total]=(counts[total]||0)+1;
  const age=y-birth.year;
  console.log(`${y}  ${String(age).padStart(3)}  ${String(k).padStart(3)}   ${String(t).padStart(2)}    ${c.padEnd(7)} ${rel.padEnd(8)}  ${String(rscore).padStart(2)}  ${String(tscore).padStart(2)}  ${String(cscore).padStart(2)}  ${String(total).padStart(3)}`);
}
console.log("");
console.log("Score distribution:", counts);
const vals=Object.keys(counts).map(Number).sort((a,b)=>a-b);
console.log("Range:", vals[0], "to", vals[vals.length-1]);
console.log("Unique scores:", vals.length);
