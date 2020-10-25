(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var r=t(n);return!isNaN(r)}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(e){return function(t){var n=t||{},r=n.width?String(n.width):e.defaultWidth;return e.formats[r]||e.formats[e.defaultWidth]}}var i,o={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},d={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function s(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,o=a.width?String(a.width):i;r=e.formattingValues[o]||e.formattingValues[i]}else{var d=e.defaultWidth,s=a.width?String(a.width):e.defaultWidth;r=e.values[s]||e.values[d]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function c(e){return function(t,n){var r=String(t),a=n||{},i=a.width,o=i&&e.matchPatterns[i]||e.matchPatterns[e.defaultMatchWidth],d=r.match(o);if(!d)return null;var s,c=d[0],u=i&&e.parsePatterns[i]||e.parsePatterns[e.defaultParseWidth];return s="[object Array]"===Object.prototype.toString.call(u)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(c))return n}(u):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(c))return n}(u),s=e.valueCallback?e.valueCallback(s):s,{value:s=a.valueCallback?a.valueCallback(s):s,rest:r.slice(c.length)}}}const u={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof r[e]?r[e]:1===t?r[e].one:r[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:o,formatRelative:function(e,t,n,r){return d[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:s({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:s({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:s({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:s({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:s({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(i={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),r=t||{},a=n.match(i.matchPattern);if(!a)return null;var o=a[0],d=n.match(i.parsePattern);if(!d)return null;var s=i.valueCallback?i.valueCallback(d[0]):d[0];return{value:s=r.valueCallback?r.valueCallback(s):s,rest:n.slice(o.length)}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function l(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function h(n,r){e(2,arguments);var a=t(n).getTime(),i=l(r);return new Date(a+i)}function m(t,n){e(2,arguments);var r=l(n);return h(t,-r)}function f(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const g=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return f("yy"===t?r%100:r,t.length)},p=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):f(n+1,2)},w=function(e,t){return f(e.getUTCDate(),t.length)},v=function(e,t){return f(e.getUTCHours()%12||12,t.length)},b=function(e,t){return f(e.getUTCHours(),t.length)},y=function(e,t){return f(e.getUTCMinutes(),t.length)},C=function(e,t){return f(e.getUTCSeconds(),t.length)},T=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return f(Math.floor(r*Math.pow(10,n-3)),t.length)};var x=864e5;function M(n){e(1,arguments);var r=1,a=t(n),i=a.getUTCDay(),o=(i<r?7:0)+i-r;return a.setUTCDate(a.getUTCDate()-o),a.setUTCHours(0,0,0,0),a}function P(n){e(1,arguments);var r=t(n),a=r.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var o=M(i),d=new Date(0);d.setUTCFullYear(a,0,4),d.setUTCHours(0,0,0,0);var s=M(d);return r.getTime()>=o.getTime()?a+1:r.getTime()>=s.getTime()?a:a-1}function E(t){e(1,arguments);var n=P(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=M(r);return a}var D=6048e5;function S(n,r){e(1,arguments);var a=r||{},i=a.locale,o=i&&i.options&&i.options.weekStartsOn,d=null==o?0:l(o),s=null==a.weekStartsOn?d:l(a.weekStartsOn);if(!(s>=0&&s<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=t(n),u=c.getUTCDay(),h=(u<s?7:0)+u-s;return c.setUTCDate(c.getUTCDate()-h),c.setUTCHours(0,0,0,0),c}function k(n,r){e(1,arguments);var a=t(n,r),i=a.getUTCFullYear(),o=r||{},d=o.locale,s=d&&d.options&&d.options.firstWeekContainsDate,c=null==s?1:l(s),u=null==o.firstWeekContainsDate?c:l(o.firstWeekContainsDate);if(!(u>=1&&u<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=new Date(0);h.setUTCFullYear(i+1,0,u),h.setUTCHours(0,0,0,0);var m=S(h,r),f=new Date(0);f.setUTCFullYear(i,0,u),f.setUTCHours(0,0,0,0);var g=S(f,r);return a.getTime()>=m.getTime()?i+1:a.getTime()>=g.getTime()?i:i-1}function L(t,n){e(1,arguments);var r=n||{},a=r.locale,i=a&&a.options&&a.options.firstWeekContainsDate,o=null==i?1:l(i),d=null==r.firstWeekContainsDate?o:l(r.firstWeekContainsDate),s=k(t,n),c=new Date(0);c.setUTCFullYear(s,0,d),c.setUTCHours(0,0,0,0);var u=S(c,n);return u}var j=6048e5;function U(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),i=r%60;if(0===i)return n+String(a);var o=t||"";return n+String(a)+o+f(i,2)}function q(e,t){return e%60==0?(e>0?"-":"+")+f(Math.abs(e)/60,2):O(e,t)}function O(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+f(Math.floor(a/60),2)+n+f(a%60,2)}const W={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return g(e,t)},Y:function(e,t,n,r){var a=k(e,r),i=a>0?a:1-a;return"YY"===t?f(i%100,2):"Yo"===t?n.ordinalNumber(i,{unit:"year"}):f(i,t.length)},R:function(e,t){return f(P(e),t.length)},u:function(e,t){return f(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return f(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return f(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return p(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return f(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,i){var o=function(n,r){e(1,arguments);var a=t(n),i=S(a,r).getTime()-L(a,r).getTime();return Math.round(i/j)+1}(n,i);return"wo"===r?a.ordinalNumber(o,{unit:"week"}):f(o,r.length)},I:function(n,r,a){var i=function(n){e(1,arguments);var r=t(n),a=M(r).getTime()-E(r).getTime();return Math.round(a/D)+1}(n);return"Io"===r?a.ordinalNumber(i,{unit:"week"}):f(i,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):w(e,t)},D:function(n,r,a){var i=function(n){e(1,arguments);var r=t(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var i=r.getTime(),o=a-i;return Math.floor(o/x)+1}(n);return"Do"===r?a.ordinalNumber(i,{unit:"dayOfYear"}):f(i,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(i);case"ee":return f(i,2);case"eo":return n.ordinalNumber(i,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),i=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(i);case"cc":return f(i,t.length);case"co":return n.ordinalNumber(i,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return f(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return v(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):b(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):y(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):C(e,t)},S:function(e,t){return T(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return q(a);case"XXXX":case"XX":return O(a);case"XXXXX":case"XXX":default:return O(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return q(a);case"xxxx":case"xx":return O(a);case"xxxxx":case"xxx":default:return O(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+U(a,":");case"OOOO":default:return"GMT"+O(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+U(a,":");case"zzzz":default:return"GMT"+O(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return f(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return f((r._originalDate||e).getTime(),t.length)}};function Y(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function N(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const z={p:N,P:function(e,t){var n,r=e.match(/(P+)(p+)?/),a=r[1],i=r[2];if(!i)return Y(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",Y(a,t)).replace("{{time}}",N(i,t))}};var H=6e4;function F(e){return e.getTime()%H}function A(e){var t=new Date(e.getTime()),n=Math.ceil(t.getTimezoneOffset());t.setSeconds(0,0);var r=n>0?(H+F(t))%H:F(t);return n*H+r}var B=["D","DD"],X=["YY","YYYY"];function Q(e){return-1!==B.indexOf(e)}function G(e){return-1!==X.indexOf(e)}function R(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var J=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,V=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,I=/^'([^]*?)'?$/,_=/''/g,K=/[a-zA-Z]/;function $(r,a,i){e(2,arguments);var o=String(a),d=i||{},s=d.locale||u,c=s.options&&s.options.firstWeekContainsDate,h=null==c?1:l(c),f=null==d.firstWeekContainsDate?h:l(d.firstWeekContainsDate);if(!(f>=1&&f<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=s.options&&s.options.weekStartsOn,p=null==g?0:l(g),w=null==d.weekStartsOn?p:l(d.weekStartsOn);if(!(w>=0&&w<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!s.localize)throw new RangeError("locale must contain localize property");if(!s.formatLong)throw new RangeError("locale must contain formatLong property");var v=t(r);if(!n(v))throw new RangeError("Invalid time value");var b=A(v),y=m(v,b),C={firstWeekContainsDate:f,weekStartsOn:w,locale:s,_originalDate:v},T=o.match(V).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,z[t])(e,s.formatLong,C):e})).join("").match(J).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return Z(e);var n=W[t];if(n)return!d.useAdditionalWeekYearTokens&&G(e)&&R(e,a,r),!d.useAdditionalDayOfYearTokens&&Q(e)&&R(e,a,r),n(y,e,s.localize,C);if(t.match(K))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return T}function Z(e){return e.match(I)[1].replace(_,"'")}const ee=(e,t)=>{let n=[];return{title:e,description:t,addToDo:(e,t,r,a,i,o)=>{n.push(((e,t,n,r,a,i)=>(n instanceof Date&&(n=$(n,"PPPP")),{title:e,description:t,priority:r,notes:a,duedate:n,checked:i,getDate:()=>n,setDate:e=>{n=$(e,"PPPP")},getChecked:()=>i,changeCheck:()=>{i=!i}}))(e,t,r,a,i,o))},getAllToDos:()=>n,removeToDo:e=>{n.splice(e,1)},getToDo:e=>n[e]}},te=()=>'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 486.4 486.4" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g> <g xmlns="http://www.w3.org/2000/svg"><g><path d="M446,70H344.8V53.5c0-29.5-24-53.5-53.5-53.5h-96.2c-29.5,0-53.5,24-53.5,53.5V70H40.4c-7.5,0-13.5,6-13.5,13.5    S32.9,97,40.4,97h24.4v317.2c0,39.8,32.4,72.2,72.2,72.2h212.4c39.8,0,72.2-32.4,72.2-72.2V97H446c7.5,0,13.5-6,13.5-13.5    S453.5,70,446,70z M168.6,53.5c0-14.6,11.9-26.5,26.5-26.5h96.2c14.6,0,26.5,11.9,26.5,26.5V70H168.6V53.5z M394.6,414.2    c0,24.9-20.3,45.2-45.2,45.2H137c-24.9,0-45.2-20.3-45.2-45.2V97h302.9v317.2H394.6z" fill="#ffffff" data-original="#000000" style="" class="" /><path d="M243.2,411c7.5,0,13.5-6,13.5-13.5V158.9c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v238.5    C229.7,404.9,235.7,411,243.2,411z" fill="#ffffff" data-original="#000000" style="" class="" /> <path d="M155.1,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9    C141.6,390.1,147.7,396.1,155.1,396.1z" fill="#ffffff" data-original="#000000" style="" class="" /><path d="M331.3,396.1c7.5,0,13.5-6,13.5-13.5V173.7c0-7.5-6-13.5-13.5-13.5s-13.5,6-13.5,13.5v208.9    C317.8,390.1,323.8,396.1,331.3,396.1z" fill="#ffffff" data-original="#000000" style="" class="" /></g></g></svg>',ne=()=>'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" version="1.1" width="20" height="20" x="0" y="0" viewBox="0 0 469.331 469.331" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""> <g> <g xmlns="http://www.w3.org/2000/svg"> <path d="M438.931,30.403c-40.4-40.5-106.1-40.5-146.5,0l-268.6,268.5c-2.1,2.1-3.4,4.8-3.8,7.7l-19.9,147.4   c-0.6,4.2,0.9,8.4,3.8,11.3c2.5,2.5,6,4,9.5,4c0.6,0,1.2,0,1.8-0.1l88.8-12c7.4-1,12.6-7.8,11.6-15.2c-1-7.4-7.8-12.6-15.2-11.6   l-71.2,9.6l13.9-102.8l108.2,108.2c2.5,2.5,6,4,9.5,4s7-1.4,9.5-4l268.6-268.5c19.6-19.6,30.4-45.6,30.4-73.3   S458.531,49.903,438.931,30.403z M297.631,63.403l45.1,45.1l-245.1,245.1l-45.1-45.1L297.631,63.403z M160.931,416.803l-44.1-44.1   l245.1-245.1l44.1,44.1L160.931,416.803z M424.831,152.403l-107.9-107.9c13.7-11.3,30.8-17.5,48.8-17.5c20.5,0,39.7,8,54.2,22.4   s22.4,33.7,22.4,54.2C442.331,121.703,436.131,138.703,424.831,152.403z" fill="#ffffff" data-original="#000000" style="" /> </g> </svg>',re=e=>{localStorage.setItem("projects",JSON.stringify(e))},ae=()=>{let e=[];return localStorage.hasOwnProperty("projects")&&JSON.parse(localStorage.getItem("projects")).forEach((t=>{e.push(ee(t.title,t.description)),localStorage.hasOwnProperty(t.title)&&JSON.parse(localStorage.getItem(t.title)).forEach((t=>{e[e.length-1].addToDo(t.title,t.description,t.duedate,t.priority,t.notes,t.checked)}))})),e},ie=e=>{localStorage.removeItem(e)},oe=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))},de=(()=>{let e=ae();return{addProject:(t,n)=>{e.push(ee(t,n)),re(e)},getAllProjects:()=>e,removeProject:t=>{ie(e[t].title),e.splice(t,1),re(e)},editProject:(t,n,r)=>{ie(e[t].title),e[t].title=n,e[t].description=r,re(e),oe(e[t].title,e[t].getAllToDos())},getProject:t=>e[t],addToDoOnProject:(t,n)=>{e[t].addToDo(n,"",new Date,"Low","",!1),oe(e[t].title,e[t].getAllToDos())}}})();(()=>{const e=e=>{let t=document.createElement("div");return t.classList.add("todowrap"),de.getProject(e).getAllToDos().forEach(((e,n)=>{let r=document.createElement("div");switch(r.classList.add("todo"),e.priority.toLowerCase()){case"low":r.classList.add("low-p");break;case"medium":r.classList.add("medium-p");break;case"high":r.classList.add("high-p")}let a=document.createElement("div");a.classList.add("todo-info");let i=document.createElement("div");i.classList.add("todo-btns"),r.dataset.id=n;let o=document.createElement("p");o.classList.add("todo-title"),o.textContent=e.title;let d=document.createElement("p");d.classList.add("todo-description"),d.textContent=e.description;let s=document.createElement("p");s.classList.add("todo-date"),s.textContent=e.duedate;let c=document.createElement("button"),u=document.createElement("button");u.id="btnBorrarToDo",c.id="btnEditarToDo",c.innerHTML=ne(),u.innerHTML=te(),i.appendChild(c),i.appendChild(u),a.appendChild(o),a.appendChild(d),a.appendChild(s),r.appendChild(a),r.appendChild(i),t.appendChild(r)})),t},t=n=>{let r=document.createElement("div");r.classList.add("bar");let a=document.createElement("input");a.type="text",a.classList.add("text-fixed");let i=document.createElement("button");return i.classList.add("btn-fixed"),i.textContent="+",r.appendChild(a),r.appendChild(i),i.addEventListener("click",(()=>{if(""!==a.value){const r=document.querySelector(".todos");for(de.addToDoOnProject(n,a.value);r.firstChild;)r.removeChild(r.lastChild);r.appendChild(e(n)),r.appendChild(t(n))}else a.placeholder="You should introduce something here."})),r},n=(e,t)=>{let n=document.createElement("div");n.classList.add("form-add");let a=document.createElement("input"),i=document.createElement("label");i.htmlFor="txtTitle",i.textContent="Title:";let o=document.createElement("label");o.htmlFor="txtDescription",o.textContent="Description:",a.type="text",a.id="txtTitle",a.value=e.title;let d=document.createElement("input");d.type="text",d.id="txtDesc",d.value=e.description;let s=document.createElement("button");s.textContent="Edit",s.classList.add("btn-aside");let c=document.createElement("p");return c.classList.add("hidden"),c.classList.add("error"),n.appendChild(i),n.appendChild(a),n.appendChild(o),n.appendChild(d),n.appendChild(s),n.appendChild(c),s.addEventListener("click",(()=>{""!==a.value&&""!==d.value?(de.editProject(t,a.value,d.value),r(),document.querySelector("#btnBackProject").classList.add("hidden"),document.querySelector("#btnAddProject").classList.remove("hidden")):(c.textContent="ERROR: Fields are still empty",c.classList.remove("hidden"))})),n},r=()=>{const a=document.querySelector(".list-projects");for(;a.firstChild;)a.removeChild(a.lastChild);(()=>{const a=document.querySelector(".list-projects");de.getAllProjects().forEach(((i,o)=>{let d=document.createElement("div");d.dataset.id=o,d.classList.add("project");let s=document.createElement("p");s.classList.add("title"),s.textContent=i.title;let c=document.createElement("p");c.classList.add("description"),c.textContent=i.description,d.appendChild(s),d.appendChild(c),d.addEventListener("click",(()=>{let a=document.querySelector(".project-details"),d=document.querySelector(".todos");for(;a.firstChild;)a.removeChild(a.lastChild);for(;d.firstChild;)d.removeChild(d.lastChild);a.appendChild(((e,t)=>{let a=document.createElement("div");a.classList.add("project-options");let i=document.createElement("div");i.classList.add("project-info");let o=document.createElement("div");o.classList.add("project-buttons");let d=document.createElement("h1");d.textContent=e.title;let s=document.createElement("button"),c=document.createElement("button");return s.id="btnEdit",c.id="btnDelete",s.innerHTML=ne(),c.innerHTML=te(),s.addEventListener("click",(()=>{const r=document.querySelector(".list-projects");document.querySelector("#btnAddProject").classList.add("hidden"),document.querySelector("#btnBackProject").classList.remove("hidden"),r.replaceChildren(n(e,t))})),c.addEventListener("click",(()=>{de.removeProject(t);let e=document.querySelector(".todos");for(;a.firstChild;)a.removeChild(a.lastChild);for(;e.firstChild;)e.removeChild(e.lastChild);r()})),i.appendChild(d),o.appendChild(s),o.appendChild(c),a.appendChild(i),a.appendChild(o),a})(i,o)),d.appendChild(e(o)),d.appendChild(t(o))})),a.appendChild(d)}))})()};return{init:()=>{r(),(()=>{const e=document.querySelector("#btnAddProject"),t=document.querySelector("#btnBackProject");e.addEventListener("click",(e=>{const n=document.querySelector(".list-projects");e.target.classList.add("hidden"),t.classList.remove("hidden"),n.replaceChildren((()=>{let e=document.createElement("div");e.classList.add("form-add");let t=document.createElement("input"),n=document.createElement("label");n.htmlFor="txtTitle",n.textContent="Title:";let a=document.createElement("label");a.htmlFor="txtDescription",a.textContent="Description:",t.type="text",t.id="txtTitle";let i=document.createElement("input");i.type="text",i.id="txtDesc";let o=document.createElement("button");o.textContent="Create",o.classList.add("btn-aside");let d=document.createElement("p");return d.classList.add("hidden"),d.classList.add("error"),e.appendChild(n),e.appendChild(t),e.appendChild(a),e.appendChild(i),e.appendChild(o),e.appendChild(d),o.addEventListener("click",(e=>{""!==t.value&&""!==i.value?(de.addProject(t.value,i.value),r(),document.querySelector("#btnBackProject").classList.add("hidden"),document.querySelector("#btnAddProject").classList.remove("hidden")):(d.textContent="ERROR: Fields are still empty",d.classList.remove("hidden"))})),e})())})),t.addEventListener("click",(t=>{t.target.classList.add("hidden"),e.classList.remove("hidden"),r()}))})()}}})().init()})();