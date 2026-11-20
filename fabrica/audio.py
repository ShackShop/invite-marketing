import numpy as np, wave
import sys,json
SR=44100; CFG=json.load(open(sys.argv[1])); DUR=CFG['dur']; N=int(SR*DUR)
rng=np.random.default_rng(3)
out=np.zeros((N,2))
def add(sig,t,gain=1.0,pan=0.0):
    i=int(t*SR); j=min(N,i+len(sig))
    if i>=N: return
    s=sig[:j-i]*gain
    out[i:j,0]+=s*(1-max(0,pan)); out[i:j,1]+=s*(1+min(0,pan))
def env(n,a=0.005,d=0.2):
    t=np.arange(n)/SR; e=np.minimum(1,t/a)*np.exp(-t/d); return e
def tone(f,dur,a=0.005,d=0.2,h=(1,)):
    n=int(dur*SR); t=np.arange(n)/SR
    s=sum(amp*np.sin(2*np.pi*f*(k+1)*t) for k,amp in enumerate(h))
    return s*env(n,a,d)
def noise(dur): return rng.standard_normal(int(dur*SR))
def lp(x,k):  # media móvil simple
    return np.convolve(x,np.ones(k)/k,mode='same')
# --- efectos ---
def pop(f=520): n=int(.12*SR); t=np.arange(n)/SR; fr=f*(1+2.5*np.exp(-t*60)); return np.sin(2*np.pi*np.cumsum(fr)/SR)*env(n,.002,.035)
def click(): return lp(noise(.03),3)*env(int(.03*SR),.0005,.006)*0.8+tone(1800,.03,.0005,.008)*0.4
def tick(): return lp(noise(.02),2)*env(int(.02*SR),.0003,.004)*0.5
def whoosh(dur=.45,up=True):
    n=int(dur*SR); x=noise(dur); t=np.arange(n)/SR
    k=np.linspace(40,4,n) if up else np.linspace(4,40,n)
    y=np.zeros(n); acc=0
    # filtro variable aproximado: suavizado por bloques
    for i in range(0,n,512):
        kk=int(k[i]); seg=x[i:i+512]; y[i:i+512]=lp(seg,max(1,kk))
    e=np.sin(np.pi*np.minimum(1,t/dur))**2
    return y*e*1.6
def chime(base=880):
    return sum(tone(base*r,1.4,.004,.5,(1,.3,.1))*g for r,g in [(1,1),(1.5,.6),(2,.45),(2.52,.25)])
def shimmer(dur=.7):
    s=np.zeros(int(dur*SR))
    for k in range(14):
        f=rng.uniform(1800,4200); st=rng.uniform(0,dur-.15); tt=tone(f,.15,.002,.05)
        i=int(st*SR); s[i:i+len(tt)]+=tt*0.35
    return s
def ding(): return tone(1318.5,.6,.003,.25,(1,.4))*0.7+tone(1975.5,.6,.003,.18)*0.4

def boom():
    n=int(.7*SR); t=np.arange(n)/SR; f=45+70*np.exp(-t*18); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.002,.28)*1.2+lp(noise(.7),6)*env(n,.001,.05)*0.4
def swipe(): return whoosh(.28,True)*0.8
def blip(): return np.concatenate([tone(880,.07,.002,.04),tone(1320,.12,.002,.06)])*0.6
def notif(): return np.concatenate([tone(1046.5,.14,.002,.08,(1,.3)),tone(1568,.5,.002,.2,(1,.3))])*0.6
FX={'whoosh':lambda:whoosh(),'boom':boom,'pop':lambda:pop(560),'click':click,'tick':tick,'swipe':swipe,'shimmer':lambda:shimmer(.7),'chime':lambda:chime(880),'ding':ding,'blip':blip,'notif':notif}
GAIN={'whoosh':.35,'boom':.55,'pop':.55,'click':.85,'tick':.5,'swipe':.35,'shimmer':.7,'chime':.35,'ding':.6,'blip':.6,'notif':.7}
for t0,k,g in CFG['cues']:
    if k in FX and t0<DUR: add(FX[k](),t0,GAIN[k]*g,rng.uniform(-.25,.25) if k=='tick' else 0)
V=CFG.get('variant',0)
bpm=[104,110,100,112][V]; beat=60/bpm
def kick():
    n=int(.35*SR); t=np.arange(n)/SR; f=55+90*np.exp(-t*30); return np.sin(2*np.pi*np.cumsum(f)/SR)*env(n,.002,.12)
def hat(): return (noise(.06)-lp(noise(.06),4))*env(int(.06*SR),.001,.015)*0.35
def snare(): return lp(noise(.2),2)*env(int(.2*SR),.001,.06)*0.45+tone(190,.2,.001,.05)*0.3
PROG=[
 [[261.6,329.6,392.0,493.9],[220.0,261.6,329.6,392.0],[174.6,220.0,261.6,329.6],[196.0,246.9,293.7,392.0]],
 [[293.7,370.0,440.0,554.4],[246.9,293.7,370.0,440.0],[196.0,246.9,293.7,370.0],[220.0,277.2,329.6,440.0]],
 [[220.0,261.6,329.6,392.0],[174.6,220.0,261.6,349.2],[261.6,329.6,392.0,493.9],[196.0,246.9,293.7,392.0]],
 [[329.6,415.3,493.9,622.3],[277.2,329.6,415.3,493.9],[220.0,277.2,329.6,415.3],[246.9,311.1,370.0,493.9]],
][V]
bar=4*beat
mus=np.zeros((N,2))
def addm(sig,t,g,pan=0):
    i=int(t*SR); j=min(N,i+len(sig))
    if i>=N: return
    mus[i:j,0]+=sig[:j-i]*g*(1-max(0,pan)); mus[i:j,1]+=sig[:j-i]*g*(1+min(0,pan))
drop=CFG.get('drop',2.5)  # la batería entra después del gancho
t=0.0
while t<DUR-0.6:
    bi=int(round(t/beat))
    if t>=drop-0.01:
        addm(kick(),t,0.85)
        if bi%4 in (1,3): addm(snare(),t,0.5)
        addm(hat(),t+beat/2,0.55,0.3)
    t+=beat
for i in range(int(DUR/bar)+1):
    ch=PROG[i%4]; tt=i*bar
    for k,f in enumerate(ch):
        addm(tone(f,bar+0.3,.25,1.6,(1,.25,.08)),tt,0.11,(-.4,.4,-.2,.2)[k])
    addm(tone(ch[0]/2,bar,.01,.8,(1,.5)),tt,0.22)
    pat=[[0,1,2,3,2,1,2,3],[0,2,1,3,0,2,3,2],[3,2,1,0,1,2,3,1],[0,1,2,3,3,2,1,0]][V]
    for s_ in range(8):
        addm(tone(ch[pat[s_]]*2,.3,.003,.12,(1,.2)),tt+s_*beat/2,0.07,(-.5 if s_%2 else .5))
fade=np.ones(N); fi=int((DUR-1.0)*SR); fade[fi:]=np.linspace(1,0,N-fi)
fade[:int(.2*SR)]=np.linspace(0,1,int(.2*SR))
mus*=fade[:,None]*0.5
mix=mus+out
mix/=max(1.0,np.abs(mix).max()/0.89)
pcm=(mix*32767).astype('<i2')
with wave.open(sys.argv[2],'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('audio ok', round(float(np.abs(mix).max()),3))
