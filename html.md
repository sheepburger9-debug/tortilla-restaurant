<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' https: data:; connect-src https://*.supabase.co https://api.openweathermap.org; object-src 'none'; base-uri 'none'; form-action 'none'">
<meta name="referrer" content="no-referrer">
<title>Tortilla | Real California Burritos & Tacos</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<style>
:root{
  --bg:#F5EFE6; --surface:#fff; --primary:#C46144; --primary-hover:#A94D33; --primary-light:#FBEDE7;
  --text:#2E2622; --muted:#857B73; --border:#EADFD2; --success:#2E7D32; --success-bg:#E8F5E9; --sale:#C62828;
  --shadow-sm:0 4px 12px rgba(46,38,34,.05); --shadow-md:0 10px 28px rgba(46,38,34,.1); --shadow-lg:0 18px 40px rgba(196,97,68,.2);
  --ease:cubic-bezier(.2,.8,.2,1); --spring:cubic-bezier(.34,1.56,.64,1);
  --serif:'DM Serif Display',Georgia,serif; --sans:'Outfit',system-ui,-apple-system,sans-serif;
  --r-sm:12px; --r-md:20px; --r-lg:28px; --r-full:999px;
  --nav-h:72px; --bottom-h:84px;
  --gold:#FFD700; --star:#FFB800;
}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{scroll-behavior:smooth}
body{font-family:var(--sans);background:var(--bg);color:var(--text);line-height:1.5;overflow-x:hidden;padding-bottom:calc(var(--bottom-h) + env(safe-area-inset-bottom,0px))}
button,a,input,textarea,select{font:inherit;color:inherit;border:0;background:none;cursor:pointer;text-decoration:none}
input[type=text],input[type=tel],input[type=date]{cursor:text}
button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible{outline:3px solid var(--primary);outline-offset:2px;border-radius:10px}
svg{width:20px;height:20px;flex-shrink:0}
.container{width:100%;max-width:1200px;margin:0 auto;padding:0 20px}
.muted{color:var(--muted)}
.h-title{font-family:var(--serif);font-size:28px;margin:8px 0 16px;display:flex;justify-content:space-between;align-items:baseline;gap:12px}
.h-title a{font:600 14px var(--sans);color:var(--primary)}
.skip-link{position:absolute;top:-100px;left:8px;background:var(--primary);color:#fff;padding:10px 16px;border-radius:8px;z-index:9999;transition:top .2s}
.skip-link:focus{top:8px}
.topbar{position:sticky;top:0;z-index:100;background:rgba(245,239,230,.96);backdrop-filter:blur(8px);border-bottom:1px solid var(--border);padding-top:env(safe-area-inset-top,0px)}
.topbar .container{height:var(--nav-h);display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:10px;text-align:left}
.logo-mark{width:44px;height:44px;flex-shrink:0}
.brand h1{font-family:var(--serif);font-size:26px;letter-spacing:1px;line-height:1}
.brand p{font-size:10px;text-transform:uppercase;letter-spacing:.6px;font-weight:500;color:var(--muted);margin-top:4px}
.actions{display:flex;gap:12px;align-items:center}
.greet{font-size:14px;font-weight:600;color:var(--muted);max-width:170px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.greet b{color:var(--primary)}
.icon-btn{width:44px;height:44px;border-radius:50%;background:var(--surface);display:grid;place-items:center;box-shadow:var(--shadow-sm);position:relative;transition:transform .3s var(--ease),box-shadow .3s}
.icon-btn:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.badge{position:absolute;top:-4px;right:-4px;min-width:20px;height:20px;padding:0 5px;border-radius:10px;background:var(--primary);color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;border:2px solid var(--surface);transform:scale(0);transition:transform .35s var(--spring)}
.badge.show{transform:scale(1)}
.badge.bump{animation:bump .4s var(--spring)}
@keyframes bump{50%{transform:scale(1.35)}}
.desk-nav{display:none;gap:28px}
.desk-nav a{font-weight:500;color:var(--muted);position:relative;padding:6px 0;transition:color .3s}
.desk-nav a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--primary);transform:scaleX(0);transition:transform .35s var(--ease)}
.desk-nav a:hover,.desk-nav a.active{color:var(--primary)}
.desk-nav a.active::after,.desk-nav a:hover::after{transform:scaleX(1)}
.bottom-nav{position:fixed;bottom:0;left:0;right:0;height:calc(var(--bottom-h) + env(safe-area-inset-bottom,0px));padding-bottom:env(safe-area-inset-bottom,0px);background:var(--surface);border-radius:28px 28px 0 0;display:flex;justify-content:space-around;align-items:center;box-shadow:0 -6px 24px rgba(0,0,0,.06);z-index:100}
.nav-item{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:11px;font-weight:500;color:var(--muted);min-width:56px;transition:color .3s}
.nav-item .ic{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;position:relative;transition:transform .45s var(--spring),background .3s,box-shadow .3s}
.nav-item.active{color:var(--primary);font-weight:600}
.nav-item.active .ic{background:var(--primary);color:#fff;box-shadow:0 8px 18px rgba(196,97,68,.35);transform:translateY(-12px)}
.nav-item .badge{top:-2px;right:-6px}
main{padding-top:24px;padding-bottom:40px;min-height:60vh;outline:none}
.view.anim{animation:viewIn .55s var(--ease) both}
@keyframes viewIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.stagger>*{opacity:0;animation:up .5s var(--ease) forwards;animation-delay:calc(var(--i,0)*70ms)}
@keyframes up{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:none}}
@keyframes float{50%{transform:translateY(-14px)}}
@keyframes wobble{0%,100%{transform:translateY(-50%) rotate(-6deg)}50%{transform:translateY(-54%) rotate(4deg)}}
@keyframes spin-in{from{transform:rotate(-180deg) scale(.5);opacity:0}to{transform:none;opacity:1}}
@keyframes confetti-fall{to{transform:translateY(100vh) rotate(720deg)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}

/* ---------- Section headers ---------- */
.sec-head{display:flex;align-items:center;justify-content:space-between;margin:32px 0 16px;gap:12px;flex-wrap:wrap}
.sec-head h2{font-family:var(--serif);font-size:24px;display:flex;align-items:center;gap:10px;line-height:1.2}
.sec-head h2 .ico{font-size:22px}
.sec-head a,.sec-head button{font-size:13px;font-weight:600;color:var(--primary);white-space:nowrap}
@media(max-width:600px){.sec-head h2{font-size:20px}.sec-head{margin:24px 0 12px}}

/* ---------- Stars ---------- */
.stars{display:inline-flex;gap:1px;align-items:center;line-height:1;flex-wrap:nowrap}
.stars .s{color:#ddd;font-size:14px}
.stars .s.on{color:var(--star)}
.rating-text{font-size:11px;font-weight:600;color:var(--text);margin-left:4px;white-space:nowrap}
.rating-text.muted{color:var(--muted);font-weight:400}

/* ---------- Free Delivery Tag ---------- */
.tag.freedel{background:var(--success);color:#fff}

/* ---------- Hero / Deliver ---------- */
.deliver{background:var(--surface);border-radius:var(--r-md);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;gap:12px;box-shadow:var(--shadow-sm);margin-bottom:18px;width:100%;text-align:left;transition:transform .3s var(--ease),box-shadow .3s}
.deliver:hover{transform:translateY(-2px);box-shadow:var(--shadow-md)}
.deliver small{display:block;font-size:12px;color:var(--muted)}
.di{width:40px;height:40px;border-radius:50%;background:var(--primary-light);color:var(--primary);display:grid;place-items:center}
.hero{background:linear-gradient(135deg,#C46144,#A94D33);border-radius:var(--r-lg);padding:36px 28px;position:relative;overflow:hidden;color:#fff;box-shadow:var(--shadow-lg);margin-bottom:24px;min-height:280px;display:flex;flex-direction:column;justify-content:center}
.hero::before{content:"";position:absolute;width:320px;height:320px;border-radius:50%;background:rgba(255,255,255,.08);right:-100px;top:-100px;animation:float 8s ease-in-out infinite}
.hero-text{position:relative;z-index:2;max-width:560px}
.hero h2{font-family:var(--serif);font-size:clamp(32px,6vw,54px);line-height:1.05;margin-bottom:12px}
.hero h2 span{display:inline-block;opacity:0;animation:up .6s var(--ease) forwards}
.hero h2 span:nth-child(2){animation-delay:.12s}.hero h2 span:nth-child(3){animation-delay:.24s}
.hero p{opacity:.92;margin-bottom:22px;font-size:16px}
.hero-emoji{position:absolute;right:8%;top:50%;font-size:clamp(100px,18vw,160px);filter:drop-shadow(0 20px 30px rgba(0,0,0,.3));animation:wobble 5s ease-in-out infinite;z-index:1}
@media (max-width:640px){.hero-emoji{opacity:.3;right:-20px}.hero{padding:28px 22px;min-height:240px}}

/* ---------- Free delivery progress ---------- */
.perk{background:var(--surface);border-radius:var(--r-md);padding:14px 18px;margin-bottom:8px;box-shadow:var(--shadow-sm)}
.perk-row{display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;gap:8px;flex-wrap:wrap}
.bar{height:8px;border-radius:8px;background:var(--bg);overflow:hidden}
.bar i{display:block;height:100%;background:linear-gradient(90deg,var(--primary),#E08A6B);border-radius:8px;transition:width .6s var(--ease)}

/* ---------- Category quick chips ---------- */
.chips{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 12px;margin-bottom:8px;scrollbar-width:none}
.chips::-webkit-scrollbar{display:none}
.chip{flex:0 0 auto;background:var(--surface);padding:10px 18px;border-radius:var(--r-full);display:flex;align-items:center;gap:8px;box-shadow:var(--shadow-sm);font-weight:600;font-size:14px;transition:transform .3s var(--ease),background .3s,color .3s;cursor:pointer}
.chip:hover{transform:translateY(-2px)}
.chip.active{background:var(--primary);color:#fff}

/* Subcat chips row */
.chips.subcat{padding-top:0;margin-top:-6px;margin-bottom:14px}
.chip.sub{padding:6px 14px;font-size:12px;font-weight:500;box-shadow:none;border:1px solid var(--border);background:var(--surface)}
.chip.sub.active{background:var(--primary-light);color:var(--primary);border-color:var(--primary);box-shadow:none}

/* ---------- Buttons ---------- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:14px 26px;border-radius:var(--r-full);font-weight:700;font-size:16px;transition:transform .3s var(--ease),box-shadow .3s,background .3s,opacity .3s;box-shadow:0 8px 20px rgba(0,0,0,.1);cursor:pointer}
.btn:hover{transform:translateY(-3px);box-shadow:0 14px 26px rgba(0,0,0,.16)}
.btn:active{transform:scale(.97)}
.btn:disabled{opacity:.6;cursor:not-allowed;transform:none!important}
.btn-light{background:#fff;color:var(--primary)}
.btn-primary{background:var(--primary);color:#fff}
.btn-primary:hover{background:var(--primary-hover)}
.btn-block{width:100%}
.btn-secondary{background:var(--surface);color:var(--text);border:2px solid var(--border)}
.btn-secondary:hover{border-color:var(--primary);color:var(--primary)}

/* ---------- Grid & Cards ---------- */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:22px;margin-bottom:36px}
.grid.scroll{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:16px;padding-bottom:12px;scrollbar-width:none}
.grid.scroll::-webkit-scrollbar{display:none}
.grid.scroll>.card{flex:0 0 220px;scroll-snap-align:start}
.card{background:var(--surface);border-radius:var(--r-md);padding:14px;box-shadow:var(--shadow-sm);display:flex;flex-direction:column;cursor:pointer;transition:transform .4s var(--ease),box-shadow .4s;position:relative}
.card:hover{transform:translateY(-6px);box-shadow:var(--shadow-lg)}
.ph{position:relative;aspect-ratio:1;border-radius:var(--r-sm);overflow:hidden;margin-bottom:10px;background:linear-gradient(135deg,var(--primary-light),#F3DCD2);display:grid;place-items:center}
.ph .emo{font-size:64px;transition:transform .5s var(--spring);z-index:1}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease)}
.card:hover .ph img{transform:scale(1.07)}
.card:hover .ph .emo{transform:scale(1.12) rotate(-4deg)}
.tag-row{position:absolute;top:10px;left:10px;right:10px;display:flex;gap:6px;flex-wrap:wrap;z-index:2}
.tag{background:rgba(255,255,255,.92);color:var(--text);font-size:11px;font-weight:600;padding:4px 9px;border-radius:var(--r-full);box-shadow:0 2px 8px rgba(0,0,0,.1)}
.tag.hot{background:var(--primary);color:#fff}
.tag.secret{background:#000;color:var(--gold)}
.card h4{font-size:16px;font-weight:600;line-height:1.35;margin-bottom:4px}
.card .sub{font-size:12px;color:var(--muted);margin-bottom:10px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.card-rating{margin-bottom:6px;min-height:18px}
.card-foot{display:flex;justify-content:space-between;align-items:center;margin-top:auto;gap:8px}
.price{font-size:18px;font-weight:700;color:var(--primary)}
.price-wrap{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
.from{font-size:11px;color:var(--muted);font-weight:500;margin-right:4px}
.old{color:#A39A92;text-decoration:line-through;font-weight:400}
.new{color:var(--sale);font-weight:700}
.add{width:38px;height:38px;border-radius:50%;background:var(--primary);color:#fff;display:grid;place-items:center;font-size:22px;line-height:1;transition:transform .3s var(--spring),background .3s;box-shadow:0 4px 10px rgba(196,97,68,.3);flex-shrink:0}
.add:hover{background:var(--primary-hover);transform:scale(1.12)}
.add:active{transform:scale(.88)}
.add.done{background:var(--success)}
.empty-search{grid-column:1/-1;text-align:center;padding:40px;color:var(--muted)}
.search{margin-bottom:14px}
.search input{width:100%;background:var(--surface);border:1px solid var(--border);border-radius:var(--r-full);padding:12px 18px}
.search input:focus{outline:none;border-color:var(--primary);box-shadow:0 0 0 4px var(--primary-light)}

/* ---------- Cart ---------- */
.cart-layout{display:grid;gap:24px}
.cart-list{display:flex;flex-direction:column;gap:14px}
.line{display:flex;gap:14px;align-items:flex-start;background:var(--surface);padding:14px;border-radius:var(--r-md);box-shadow:var(--shadow-sm);animation:up .4s var(--ease) both}
.thumb{width:72px;height:72px;border-radius:var(--r-sm);background:var(--primary-light);display:grid;place-items:center;font-size:32px;flex-shrink:0}
.line .info{flex:1;min-width:0}
.line h4{font-size:15px;margin-bottom:2px}
.line .opts{font-size:12px;color:var(--muted);line-height:1.5}
.line .note{font-size:12px;font-style:italic;color:var(--primary)}
.line .lp{font-weight:700;color:var(--primary);margin-top:4px;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.free-pill{background:var(--success);color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:var(--r-full);letter-spacing:.5px}
.qty{display:flex;align-items:center;gap:10px;background:var(--bg);padding:4px 8px;border-radius:var(--r-full);flex-shrink:0}
.qty button{width:30px;height:30px;border-radius:50%;font-weight:700;font-size:18px;display:grid;place-items:center;transition:background .2s,color .2s}
.qty button:hover{background:#fff;color:var(--primary)}
.qty span{min-width:20px;text-align:center;font-weight:600}
.summary{background:var(--surface);padding:24px;border-radius:var(--r-lg);box-shadow:var(--shadow-md)}
.summary h3{font-family:var(--serif);font-size:24px;margin-bottom:14px}
.coupon{display:flex;gap:8px;margin-bottom:6px}
.coupon input{flex:1;min-width:0;padding:12px 14px;border-radius:var(--r-sm);border:1.5px solid var(--border);background:var(--bg);text-transform:uppercase}
.coupon input:focus{outline:none;border-color:var(--primary);background:#fff}
.btn-mini{padding:0 18px;border-radius:var(--r-sm);background:var(--text);color:#fff;font-weight:600;min-height:44px}
.cmsg{font-size:13px;color:var(--sale);min-height:18px;margin-bottom:8px}
.cmsg.ok{color:var(--success)}
.row{display:flex;justify-content:space-between;margin-bottom:10px;color:var(--muted);gap:8px}
.row.save{color:var(--success);font-weight:600}
.row.total{font-size:21px;font-weight:700;color:var(--text);border-top:2px dashed var(--border);padding-top:14px;margin-top:6px;margin-bottom:20px}
.free{color:var(--success)}
.free-note{font-size:13px;color:var(--success);font-weight:600;margin-top:8px}
.pay{display:flex;gap:12px;align-items:center;background:#FFF8E7;border-radius:var(--r-sm);padding:12px 14px;margin:14px 0}
.pay small{display:block;color:var(--muted);font-size:12px}
.sec{font-size:15px;margin:14px 0 10px}
.fgrid{display:grid;gap:10px}
.fgrid input{width:100%;padding:12px 14px;border-radius:var(--r-sm);border:1.5px solid var(--border);background:var(--bg);font-size:15px}
.fgrid input:focus{outline:none;border-color:var(--primary);background:#fff}
.f3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.ferr{color:var(--sale);font-size:13px;min-height:18px;margin:8px 0}

/* ---------- Empty ---------- */
.empty{text-align:center;padding:60px 20px}
.empty .big{font-size:72px;margin-bottom:12px;display:inline-block;animation:float 4s ease-in-out infinite}
.empty h2{font-family:var(--serif);font-size:28px;margin-bottom:8px}
.empty p{color:var(--muted);margin-bottom:24px}
.reorder-btn{margin-top:10px;padding:8px 16px;font-size:13px}

/* ---------- Orders ---------- */
.orders{display:grid;gap:18px}
.order{background:var(--surface);border-radius:var(--r-md);padding:20px;box-shadow:var(--shadow-sm)}
.order-head{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;border-bottom:1px dashed var(--border);padding-bottom:12px;margin-bottom:12px}
.order-head h4{font-size:18px}
.status{background:var(--success-bg);color:var(--success);padding:6px 12px;border-radius:20px;font-size:13px;font-weight:600;height:fit-content;transition:background .4s,color .4s}
.status.live{background:var(--primary-light);color:var(--primary)}
.steps{display:flex;justify-content:space-between;margin:14px 0 6px;font-size:11px;color:var(--muted);gap:4px}
.steps span.on{color:var(--primary);font-weight:600}
.order-line{display:flex;justify-content:space-between;gap:10px;margin-bottom:8px;font-size:14px;align-items:flex-start}
.order-total{text-align:right;font-weight:700;font-size:18px;color:var(--primary);border-top:1px solid var(--border);padding-top:10px;margin-top:8px}
.order-actions{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}

/* ---------- Profile ---------- */
.profile{max-width:560px;margin:20px auto 0;text-align:center}
.avatar{width:110px;height:110px;border-radius:50%;background:#EAD9CC;margin:0 auto 16px;display:grid;place-items:center;font-size:48px;animation:spin-in .8s var(--spring) both}
.name-box{background:var(--surface);border-radius:var(--r-md);padding:18px;box-shadow:var(--shadow-sm);margin:18px 0;text-align:left}
.name-box label{display:block;font-weight:600;font-size:14px;margin-bottom:8px}
.name-row{display:flex;gap:8px}
.name-row input{flex:1;min-width:0;padding:12px 14px;border-radius:var(--r-sm);border:1.5px solid var(--border);background:var(--bg);font-size:15px}
.name-row input:focus{outline:none;border-color:var(--primary);background:#fff}
.menu-card{background:var(--surface);border-radius:var(--r-md);padding:6px 20px;box-shadow:var(--shadow-sm);margin:18px 0;text-align:left}
.menu-row{display:flex;justify-content:space-between;align-items:center;padding:16px 4px;border-bottom:1px solid var(--border);font-weight:500;width:100%;transition:padding .3s var(--ease),color .3s;cursor:pointer}
.menu-row:last-child{border-bottom:0}
.menu-row:hover{padding-left:12px;color:var(--primary)}

/* ---------- Modal ---------- */
.overlay{position:fixed;inset:0;background:rgba(30,20,15,.5);opacity:0;visibility:hidden;transition:opacity .35s,visibility .35s;z-index:1000}
.overlay.show{opacity:1;visibility:visible}
.modal{position:fixed;left:0;right:0;bottom:0;margin:auto;width:100%;max-width:560px;max-height:92vh;overflow-y:auto;background:var(--surface);border-radius:var(--r-lg) var(--r-lg) 0 0;padding:22px 22px calc(22px + env(safe-area-inset-bottom,0px));z-index:1001;transform:translateY(105%);visibility:hidden;transition:transform .45s var(--ease),visibility .45s}
.modal.show{transform:none;visibility:visible}
.modal-wrap{position:relative}
.mpic{height:190px;border-radius:var(--r-md);background:linear-gradient(135deg,var(--primary-light),#F3DCD2);display:grid;place-items:center;font-size:84px;margin-bottom:16px;position:relative;overflow:hidden}
.mpic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.modal h2{font-family:var(--serif);font-size:28px;margin-bottom:6px;padding-right:44px}
.modal .desc{color:var(--muted);font-size:14px;margin-bottom:10px}
.modal-rating{margin-bottom:12px}
.ingr{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}
.ingr span{background:var(--bg);font-size:12px;padding:4px 10px;border-radius:var(--r-full)}
.allergy{font-size:12px;color:#8A4B2E;background:#FFF4E5;padding:8px 12px;border-radius:var(--r-sm);margin-bottom:16px}
.group{margin-bottom:16px}
.group h5{font-size:13px;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin-bottom:8px}
.opt{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;border:1.5px solid var(--border);border-radius:var(--r-sm);margin-bottom:8px;cursor:pointer;transition:border-color .25s,background .25s}
.opt:hover{border-color:var(--primary)}
.opt.sel{border-color:var(--primary);background:var(--primary-light)}
.opt .pr{font-weight:600;color:var(--primary);font-size:14px}
.opt .meta{display:flex;flex-direction:column}
.opt small{font-size:11px;color:var(--muted)}
.pillrow{display:flex;gap:8px;flex-wrap:wrap}
.pillrow .opt{margin:0;flex:1 1 auto;justify-content:center;min-width:90px}
.note-input{width:100%;padding:12px 14px;border-radius:var(--r-sm);border:1.5px solid var(--border);background:var(--bg);font-size:14px;resize:none;min-height:60px;font-family:inherit}
.note-input:focus{outline:none;border-color:var(--primary);background:#fff}
.modal-foot{position:sticky;bottom:-22px;background:var(--surface);padding-top:12px;display:flex;align-items:center;gap:12px;justify-content:space-between;flex-wrap:wrap}
.qty.big{padding:8px 12px}
.modal-price{font-size:26px;font-weight:700;color:var(--primary)}
.close{position:absolute;top:14px;right:14px;width:40px;height:40px;border-radius:50%;background:var(--bg);display:grid;place-items:center;z-index:5;transition:transform .3s var(--spring),background .3s}
.close:hover{transform:rotate(90deg);background:var(--border)}

/* ---------- Reviews ---------- */
.reviews-section{margin-top:20px;padding-top:20px;border-top:1px solid var(--border)}
.reviews-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;gap:10px;flex-wrap:wrap}
.reviews-header h4{font-family:var(--serif);font-size:20px;display:flex;align-items:baseline;gap:8px}
.reviews-summary{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--muted)}
.review-item{padding:14px 0;border-bottom:1px solid var(--border)}
.review-item:last-child{border-bottom:0}
.review-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;gap:8px;flex-wrap:wrap}
.review-author{font-weight:600;font-size:14px}
.review-date{font-size:12px;color:var(--muted)}
.review-stars{color:var(--star);font-size:14px;letter-spacing:1px;display:block;margin-bottom:4px}
.review-text{font-size:14px;color:var(--text);line-height:1.5;word-break:break-word}
.no-reviews{text-align:center;padding:24px 12px;color:var(--muted);font-size:14px}
.review-form{margin-top:16px;padding:16px;background:var(--bg);border-radius:var(--r-sm)}
.review-form h6{font-size:14px;font-weight:700;margin-bottom:10px}
.star-picker{display:flex;gap:2px;margin-bottom:12px}
.star-picker .star{font-size:30px;color:#ddd;background:none;padding:0;transition:color .15s;line-height:1;width:auto;height:auto;border:0}
.star-picker .star.on,.star-picker .star:hover{color:var(--star)}
.review-form input,.review-form textarea{width:100%;padding:10px 12px;border-radius:8px;border:1.5px solid var(--border);background:var(--surface);font-size:14px;margin-bottom:8px;font-family:inherit;display:block}
.review-form input:focus,.review-form textarea:focus{outline:none;border-color:var(--primary)}
.review-form textarea{resize:none;min-height:64px}
.review-form-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:4px}
.review-form-actions .btn{padding:10px 20px;font-size:14px}

/* ---------- Toast ---------- */
.toast{position:fixed;top:calc(16px + env(safe-area-inset-top,0px));left:50%;transform:translate(-50%,-160%);background:var(--text);color:#fff;padding:14px 22px;border-radius:var(--r-full);font-weight:500;box-shadow:0 12px 30px rgba(0,0,0,.2);z-index:2000;display:flex;align-items:center;gap:10px;max-width:calc(100% - 32px);transition:transform .45s var(--spring)}
.toast.show{transform:translate(-50%,0)}
.toast svg{color:#8BC34A}

/* ---------- Loyalty / Points / Gamification (unchanged structure) ---------- */
.stamp-card{background:linear-gradient(135deg,#FFF8E7,#FFE8C7);border-radius:var(--r-md);padding:20px;margin:18px 0;text-align:center;box-shadow:var(--shadow-md);border:2px dashed var(--gold)}
.stamp-card h3{font-family:var(--serif);font-size:22px;margin-bottom:8px;color:var(--text)}
.stamp-card p{font-size:14px;color:var(--muted);margin-bottom:16px}
.stamps-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:16px 0;justify-items:center}
.stamp{width:50px;height:50px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:24px;box-shadow:0 2px 8px rgba(0,0,0,.1);transition:transform .3s var(--spring)}
.stamp.filled{background:var(--gold);transform:scale(1.1);animation:pulse .5s var(--ease)}
.stamp.empty{border:2px dashed var(--border)}
.stamp-progress{font-size:14px;font-weight:600;color:var(--text);margin-top:12px}
.points-card{background:var(--surface);border-radius:var(--r-md);padding:18px;margin:18px 0;box-shadow:var(--shadow-sm);text-align:left}
.level-badge{display:inline-flex;align-items:center;gap:8px;padding:6px 14px;border-radius:var(--r-full);font-weight:700;font-size:14px;margin-bottom:12px}
.level-mild{background:#E8F5E9;color:#2E7D32}
.level-medium{background:#FFF3E0;color:#E65100}
.level-hot{background:#FFEBEE;color:#C62828}
.points-display{font-size:28px;font-weight:700;color:var(--primary);margin:8px 0}
.points-progress{height:8px;background:var(--bg);border-radius:8px;overflow:hidden;margin:8px 0}
.points-progress i{height:100%;background:linear-gradient(90deg,var(--gold),#FFA500);transition:width .6s var(--ease)}
.spin-card{background:linear-gradient(135deg,#C46144,#8B3A1F);border-radius:var(--r-md);padding:20px;margin:0;text-align:center;color:#fff;transition:transform .3s var(--ease);height:100%;display:flex;flex-direction:column;justify-content:center}
.spin-card h3{font-family:var(--serif);font-size:20px;margin-bottom:8px}
.wheel-container{position:relative;width:180px;height:180px;margin:16px auto}
.wheel{width:100%;height:100%;border-radius:50%;background:conic-gradient(from 0deg,#FFD700 0deg 72deg,#C46144 72deg 144deg,#8BC34A 144deg 216deg,#2196F3 216deg 288deg,#9C27B0 288deg 360deg);transition:transform 3s cubic-bezier(.17,.67,.12,.99);position:relative}
.wheel::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;background:#fff;border-radius:50%;border:4px solid var(--text)}
.wheel-pointer{position:absolute;top:-10px;left:50%;transform:translateX(-50%);width:0;height:0;border-left:15px solid transparent;border-right:15px solid transparent;border-top:25px solid var(--text);z-index:2}
.scratch-card{background:linear-gradient(135deg,#C46144,#A94D33);border-radius:var(--r-md);padding:20px;margin:0;text-align:center;color:#fff;height:100%;display:flex;flex-direction:column;justify-content:center}
.scratch-area{width:220px;height:100px;background:#ccc;margin:16px auto;border-radius:var(--r-sm);position:relative;overflow:hidden;cursor:pointer}
.scratch-prize{position:absolute;inset:0;display:grid;place-items:center;font-size:16px;font-weight:700;color:var(--text);background:#FFF8E7;text-align:center;padding:8px}
.scratch-cover{position:absolute;inset:0;background:linear-gradient(135deg,#888,#aaa);display:grid;place-items:center;color:#fff;font-weight:700;transition:opacity .4s}
.scratch-cover.hidden{opacity:0;pointer-events:none}
.mystery-card{background:linear-gradient(135deg,#9C27B0,#6A1B9A);border-radius:var(--r-md);padding:20px;margin:0;text-align:center;color:#fff;position:relative;overflow:hidden;height:100%;display:flex;flex-direction:column;justify-content:center}
.mystery-card::before{content:'🎁';position:absolute;font-size:120px;opacity:.1;right:-20px;bottom:-20px}
.mystery-emoji{font-size:48px;margin:12px 0;animation:wobble 2s ease-in-out infinite}
.weather-card{background:var(--surface);border-radius:var(--r-md);padding:18px;margin:0 0 16px;box-shadow:var(--shadow-sm);display:flex;align-items:center;gap:16px}
.weather-icon{font-size:44px;flex-shrink:0}
.weather-info h4{font-size:16px;margin-bottom:4px}
.weather-info p{font-size:14px;color:var(--muted)}
.fact-banner{background:linear-gradient(135deg,#FFF8E7,#FFE8C7);border-radius:var(--r-sm);padding:12px 16px;margin:0 0 14px;text-align:center;font-size:14px;border:1px solid var(--border)}
.fact-banner .emoji{font-size:20px;margin-right:8px}
.confetti-container{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999}
.confetti-piece{position:absolute;width:10px;height:10px;top:-10px;animation:confetti-fall 3s linear forwards}
.achievements-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(90px,1fr));gap:12px;margin:18px 0}
.achievement{background:var(--surface);border-radius:var(--r-sm);padding:12px;text-align:center;box-shadow:var(--shadow-sm);transition:transform .3s var(--ease)}
.achievement:hover{transform:translateY(-4px)}
.achievement.locked{opacity:.4;filter:grayscale(100%)}
.achievement .badge-icon{font-size:32px;margin-bottom:4px}
.achievement .badge-name{font-size:11px;font-weight:600;color:var(--text)}
.combo-card{background:var(--surface);border-radius:var(--r-md);padding:14px;margin:8px 0;box-shadow:var(--shadow-sm);cursor:pointer;transition:transform .3s var(--ease);width:100%;text-align:left}
.combo-card:hover{transform:translateX(4px)}
.combo-user{font-size:12px;color:var(--muted);margin-bottom:4px}
.combo-items{font-weight:600;font-size:14px}
.chef-special{background:linear-gradient(135deg,#FF6B35,#C46144);border-radius:var(--r-lg);padding:24px;margin:0;color:#fff;position:relative;overflow:hidden;height:100%;display:flex;flex-direction:column;justify-content:center}
.chef-special::before{content:'👨‍🍳';position:absolute;right:-10px;top:-10px;font-size:100px;opacity:.2}
.chef-special h3{font-family:var(--serif);font-size:22px;margin-bottom:8px}
.chef-special .special-price{font-size:26px;font-weight:700;margin:12px 0;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap}
.chef-special .special-price s{color:rgba(255,255,255,.6);font-size:18px;font-weight:400}
.live-counter{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;background:rgba(255,107,53,.1);border-radius:var(--r-full);font-size:12px;font-weight:600;color:var(--primary)}
.live-dot{width:6px;height:6px;background:var(--primary);border-radius:50%;animation:pulse 1s infinite}
.secret-box{background:linear-gradient(135deg,#1a1a1a,#2d2d2d);border-radius:var(--r-md);padding:20px;margin:16px 0;color:#fff;text-align:center;border:2px dashed var(--gold)}
.secret-box h3{font-family:var(--serif);font-size:22px;color:var(--gold);margin-bottom:8px}
.secret-box p{font-size:13px;opacity:.8;margin-bottom:12px}
.secret-input-row{display:flex;gap:8px;max-width:340px;margin:0 auto}
.secret-input-row input{flex:1;min-width:0;padding:12px 14px;border-radius:var(--r-sm);background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.2);text-transform:uppercase;letter-spacing:2px;text-align:center;font-weight:600}
.secret-input-row input::placeholder{color:rgba(255,255,255,.4);letter-spacing:0;text-transform:none}
.secret-input-row input:focus{outline:none;border-color:var(--gold);background:rgba(255,255,255,.15)}
.secret-input-row button{background:var(--gold);color:#000;font-weight:700;padding:0 20px;border-radius:var(--r-sm)}
.voucher-list{display:flex;flex-direction:column;gap:8px;margin:12px 0}
.voucher-item{background:linear-gradient(135deg,#FFF8E7,#FFE8C7);border-radius:var(--r-sm);padding:12px 16px;display:flex;align-items:center;gap:12px;border-left:4px solid var(--gold);text-align:left;font-size:14px}
.voucher-item .v-emoji{font-size:24px}
.voucher-item .v-text{flex:1}
.voucher-item .v-text strong{display:block;color:var(--text)}
.voucher-item .v-text small{color:var(--muted);font-size:12px}

/* Reward rows on home */
.reward-row{display:grid;gap:16px;margin-bottom:8px}
@media(min-width:720px){.reward-row{grid-template-columns:1fr 1fr}}
@media(min-width:1000px){.reward-row{grid-template-columns:1fr 1fr 1fr}}

/* Free delivery section styling */
.freedel-item{position:relative}

@media (min-width:900px){
  .desk-nav{display:flex}
  .bottom-nav{display:none}
  body{padding-bottom:0}
  .brand h1{font-size:30px}
  .hero{padding:60px;min-height:340px}
  main{padding-top:36px}
  .container{padding:0 40px}
  .cart-layout{grid-template-columns:2fr 1fr;align-items:start}
  .modal{top:50%;bottom:auto;left:50%;right:auto;transform:translate(-50%,-46%) scale(.94);opacity:0;border-radius:var(--r-lg);padding:28px;transition:transform .45s var(--spring),opacity .3s,visibility .3s}
  .modal.show{transform:translate(-50%,-50%) scale(1);opacity:1}
  .mpic{height:280px}
}
@media (max-width:899px){.desk-only{display:none}}
@media (min-width:900px){.mob-only{display:none}}
@media (max-width:480px){.greet{display:none}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
</style>
</head>
<body>

<a href="#app" class="skip-link">Skip to main content</a>

<header class="topbar">
  <div class="container">
    <a href="#/home" class="brand" aria-label="Tortilla home">
      <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="23" fill="#C46144"/><ellipse cx="24" cy="24" rx="16" ry="11" fill="#F5EFE6" transform="rotate(-20 24 24)"/><path d="M14 28c4-6 14-8 20-3" stroke="#C46144" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>
      <div><h1>TORTILLA</h1><p>Real California Burritos &amp; Tacos</p></div>
    </a>
    <nav class="desk-nav desk-only" aria-label="Main">
      <a href="#/home" data-nav="home">Home</a>
      <a href="#/menu" data-nav="menu">Menu</a>
      <a href="#/orders" data-nav="orders">My Orders</a>
    </nav>
    <div class="actions">
      <span class="greet" id="greet"></span>
      <a href="#/cart" class="icon-btn desk-only" aria-label="Cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="badge" data-badge>0</span></a>
      <a href="#/profile" class="icon-btn" aria-label="Profile"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></a>
    </div>
  </div>
</header>

<main id="app" class="container" tabindex="-1"></main>

<nav class="bottom-nav mob-only" aria-label="Mobile">
  <a href="#/home" class="nav-item" data-nav="home"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><span>Home</span></a>
  <a href="#/menu" class="nav-item" data-nav="menu"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div><span>Menu</span></a>
  <a href="#/cart" class="nav-item" data-nav="cart"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg><span class="badge" data-badge>0</span></div><span>Cart</span></a>
  <a href="#/orders" class="nav-item" data-nav="orders"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div><span>Orders</span></a>
  <a href="#/profile" class="nav-item" data-nav="profile"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div><span>Profile</span></a>
</nav>

<div class="overlay" data-action="close-modal"></div>
<div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle" aria-hidden="true">
  <div class="modal-wrap" id="mBody"></div>
</div>

<div class="toast" id="toast" role="status" aria-live="polite">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  <span id="toastMsg"></span>
</div>

<div class="confetti-container" id="confettiContainer"></div>

<script>
(() => {
  'use strict';

  /* ============================================================
     SECTION 1 · CONFIG
     ============================================================ */
  const CONFIG = {
    DELIVERY_FEE: 2.99,
    FREE_DELIVERY_AT: 20,
    MAX_QTY: 20,
    STATUS_STEP_MS: 6000,
    CURRENCY: '£',
    SUPABASE_URL: 'https://your-project.supabase.co',
    SUPABASE_KEY: 'your-anon-key',
    WEATHER_API_KEY: 'your-openweathermap-key',
    WEATHER_CITY: 'London,UK',
    STAMPS_FOR_REWARD: 10,
    POINTS_PER_POUND: 1,
    POINTS_FOR_DISCOUNT: 100,
    DISCOUNT_VALUE: 5,
    SECRET_CODE: 'TACO2024',
    SECRET_ORDERS_NEEDED: 3
  };

  const COUPONS = { TORTILLA10: 0.10, WELCOME20: 0.20, BIRTHDAY50: 0.50 };
  const STATUSES = ['Received', 'Preparing', 'On the way', 'Delivered'];
  const SPICE_LEVELS = ['Mild', 'Medium', 'Hot'];
  const ALLERGENS = { gluten: '🌾 Gluten', dairy: '🥛 Dairy', egg: '🥚 Egg', nuts: '🥜 Nuts' };
  const TAGS = { popular: '🔥 Popular', spicy: '🌶 Spicy', veggie: '🥬 Veggie' };

  const CATS = [
    { id: 'Burritos', icon: '🌯' },
    { id: 'Tacos', icon: '🌮' },
    { id: 'Bowls', icon: '🥗' },
    { id: 'Quesadillas', icon: '🫓' },
    { id: 'Sides', icon: '🍟' },
    { id: 'Drinks', icon: '🥤' }
  ];

  /* Subcategories: category → [{id, label}] */
  const SUBCATS = {
    Burritos: [{ id: 'chicken', label: 'Chicken' }, { id: 'beef', label: 'Beef' }, { id: 'veggie', label: 'Veggie' }],
    Tacos: [{ id: 'chicken', label: 'Chicken' }, { id: 'fish', label: 'Fish' }, { id: 'beef', label: 'Beef' }],
    Bowls: [{ id: 'chicken', label: 'Chicken' }, { id: 'veggie', label: 'Veggie' }],
    Quesadillas: [{ id: 'chicken', label: 'Chicken' }, { id: 'cheese', label: 'Cheese' }],
    Sides: [{ id: 'chips', label: 'Chips' }, { id: 'nachos', label: 'Nachos' }],
    Drinks: [{ id: 'cold', label: 'Cold Drinks' }]
  };

  const ADDONS = {
    cheese:    { name: 'Extra cheese',   price: 0.75, allergens: ['dairy'] },
    sourcream: { name: 'Sour cream',     price: 0.60, allergens: ['dairy'] },
    guac:      { name: 'Guacamole',      price: 1.50, allergens: [] },
    chicken:   { name: 'Extra chicken',  price: 2.00, allergens: [] },
    jalapeno:  { name: 'Jalapeños',      price: 0.40, allergens: [] },
    chipotle:  { name: 'Chipotle sauce', price: 0.50, allergens: [] },
    garlic:    { name: 'Garlic sauce',   price: 0.50, allergens: ['egg'] },
    ranch:     { name: 'Ranch',          price: 0.50, allergens: ['dairy'] }
  };

  const LOADING_FACTS = [
    { emoji: '🌯', text: 'The California burrito was invented in San Diego in the 1980s' },
    { emoji: '🥑', text: 'Avocados are technically a fruit, not a vegetable!' },
    { emoji: '🌶', text: 'Jalapeños get their heat from a compound called capsaicin' },
    { emoji: '🧀', text: 'Cheese has been made for over 4,000 years' },
    { emoji: '🌽', text: 'Corn tortillas have been a Mexican staple for millennia' },
    { emoji: '🍋', text: 'Fresh lime juice stops guacamole turning brown' },
    { emoji: '🔥', text: 'Our sauces are made fresh daily with authentic recipes' },
    { emoji: '🌮', text: 'Tacos originated in Mexican silver mines in the 18th century' }
  ];

  const WHEEL_PRIZES = [
    { name: '10% Off',       probability: 30, type: 'percent', pct: 0.10, emoji: '🎟️' },
    { name: 'Free Delivery', probability: 20, type: 'delivery', emoji: '🚚' },
    { name: 'Free Guac',     probability: 25, type: 'guac', emoji: '🥑' },
    { name: '£2 Gift',       probability: 15, type: 'flat', amount: 2, emoji: '💷' },
    { name: 'Try Again',     probability: 10, type: 'none', emoji: '🎲' }
  ];

  const SCRATCH_PRIZES = [
    { name: '10% Off',       type: 'percent', pct: 0.10, emoji: '🎟️' },
    { name: 'Free Delivery', type: 'delivery', emoji: '🚚' },
    { name: 'Free Guac',     type: 'guac', emoji: '🥑' },
    { name: '£1 Gift',       type: 'flat', amount: 1, emoji: '💷' },
    { name: 'Free Drink',    type: 'percent', pct: 0.15, emoji: '🥤' }
  ];

  const ACHIEVEMENTS = {
    first_order:    { name: 'First Order',    icon: '🌯', description: 'Placed your first order' },
    night_owl:      { name: 'Night Owl',      icon: '🌙', description: 'Ordered after 10 PM' },
    guac_master:    { name: 'Guac Master',    icon: '🥑', description: 'Ordered guacamole 10 times' },
    spice_king:     { name: 'Spice King',     icon: '🔥', description: 'Tried all spicy items' },
    loyal_customer: { name: 'Loyal Customer', icon: '⭐', description: 'Placed 10 orders' },
    healthy_choice: { name: 'Healthy Choice', icon: '🥗', description: 'Ordered 5 veggie items' },
    secret_finder:  { name: 'Secret Finder',  icon: '🤫', description: 'Unlocked the secret menu' }
  };

  const COMBOS = [
    { user: 'Sara M.',  label: "Sara's Favorite",  items: ['cal-burrito', 'chips-guac'] },
    { user: 'Ahmed K.', label: 'Spicy & Sweet',    items: ['beef-bur', 'horchata'] },
    { user: 'Layla H.', label: 'Fresh Combo',      items: ['veg-bowl', 'horchata'] }
  ];

  /* ============================================================
     SECTION 2 · MENU DATA (with subcat + freeDelivery)
     ============================================================ */
  const img = id => `https://images.unsplash.com/${id}?q=80&w=600&auto=format&fit=crop`;

  const MENU_ITEMS = [
    {
      id: 'cal-burrito', name: 'Chicken California Burrito', cat: 'Burritos', subcat: 'chicken', emo: '🌯',
      img: img('photo-1626700051175-6818013e1d4f'), tags: ['popular'], spice: true, freeDelivery: true,
      desc: 'A true Californian classic, stuffed and rolled tight.',
      ingr: ['Grilled chicken', 'Seasoned rice', 'Black beans', 'Cheese', 'Guacamole', 'Pico de gallo'],
      allergens: ['gluten', 'dairy'],
      addons: ['cheese', 'sourcream', 'guac', 'chicken', 'jalapeno', 'chipotle'],
      sizes: [{ key: 'R', label: 'Regular', price: 8.75 }, { key: 'L', label: 'Large', price: 10.25 }]
    },
    {
      id: 'bbq-bowl', name: 'Korean BBQ Chicken Bowl', cat: 'Bowls', subcat: 'chicken', emo: '🥗',
      img: img('photo-1546069901-ba9599a7e63c'), tags: [], spice: true,
      desc: 'Spicy Korean BBQ chicken over cilantro-lime rice.',
      ingr: ['Korean BBQ chicken', 'Cilantro-lime rice', 'Black beans', 'Fresh salsa'],
      allergens: ['gluten'],
      addons: ['cheese', 'guac', 'jalapeno', 'chipotle', 'chicken'],
      sizes: [{ key: 'R', label: 'Regular', price: 8.25 }, { key: 'L', label: 'Large', price: 9.75 }]
    },
    {
      id: 'chk-tacos', name: 'Spicy Chicken Tacos', cat: 'Tacos', subcat: 'chicken', emo: '🌮',
      img: img('photo-1551504734-5ee1c4a1479b'), tags: ['spicy'], spice: true,
      desc: 'Soft corn tortillas with spicy chicken and sour cream.',
      ingr: ['Spicy chicken', 'Corn tortillas', 'Shredded cheese', 'Lettuce', 'Sour cream'],
      allergens: ['dairy'],
      addons: ['guac', 'jalapeno', 'chipotle', 'cheese'],
      sizes: [{ key: '3', label: '3 pcs', price: 7.25 }, { key: '5', label: '5 pcs', price: 11.00 }]
    },
    {
      id: 'fish-tacos', name: 'Crispy Fish Tacos', cat: 'Tacos', subcat: 'fish', emo: '🌮',
      img: img('photo-1512838243191-e81e8f66f1fd'), tags: [], spice: false,
      desc: 'Crispy white fish with cabbage slaw and chipotle mayo.',
      ingr: ['Crispy white fish', 'Cabbage slaw', 'Chipotle mayo', 'Corn tortillas'],
      allergens: ['gluten', 'egg'],
      addons: ['chipotle', 'guac', 'jalapeno'],
      sizes: [{ key: '2', label: '2 pcs', price: 8.50 }, { key: '4', label: '4 pcs', price: 15.50 }]
    },
    {
      id: 'beef-bur', name: 'Beef Barbacoa Burrito', cat: 'Burritos', subcat: 'beef', emo: '🌯',
      img: img('photo-1565299507177-b0ac66763828'), tags: ['spicy'], spice: true,
      desc: 'Slow-cooked shredded beef with chipotle sauce.',
      ingr: ['Barbacoa beef', 'Rice', 'Pinto beans', 'Cheese', 'Chipotle sauce'],
      allergens: ['gluten', 'dairy'],
      addons: ['cheese', 'sourcream', 'guac', 'jalapeno'],
      sizes: [{ key: 'R', label: 'Regular', price: 9.25 }, { key: 'L', label: 'Large', price: 10.75 }]
    },
    {
      id: 'veg-bowl', name: 'Veggie Fajita Bowl', cat: 'Bowls', subcat: 'veggie', emo: '🥗',
      img: img('photo-1512621776951-a57141f2eefd'), tags: ['veggie'], spice: false, freeDelivery: true,
      desc: 'Grilled peppers, onions and zucchini over rice.',
      ingr: ['Bell peppers', 'Onions', 'Zucchini', 'Rice', 'Black beans', 'Guacamole'],
      allergens: [],
      addons: ['cheese', 'guac', 'jalapeno', 'sourcream'],
      sizes: [{ key: 'R', label: 'Regular', price: 7.50 }, { key: 'L', label: 'Large', price: 9.00 }]
    },
    {
      id: 'loaded-quesa', name: 'Loaded Quesadilla', cat: 'Quesadillas', subcat: 'chicken', emo: '🫓',
      img: img('photo-1618040996337-56904b7850b9'), tags: [], spice: false,
      desc: 'Grilled flour tortilla with cheese, chicken, peppers and onions.',
      ingr: ['Flour tortilla', 'Cheese', 'Chicken', 'Peppers', 'Onions'],
      allergens: ['gluten', 'dairy'],
      addons: ['guac', 'sourcream', 'jalapeno', 'chicken'],
      sizes: [{ key: 'S', label: 'Single', price: 9.50 }]
    },
    {
      id: 'chips-guac', name: 'Chips & Guacamole', cat: 'Sides', subcat: 'chips', emo: '🍟',
      img: img('photo-1600891964092-4316c288032e'), tags: ['veggie', 'popular'], spice: false, off: 0.20,
      freeDelivery: true,
      desc: 'Freshly fried chips with our hand-mashed guacamole.',
      ingr: ['Tortilla chips', 'Avocado', 'Lime', 'Salt'],
      allergens: ['gluten'],
      addons: ['jalapeno', 'chipotle'],
      sizes: [{ key: 'S', label: 'Regular', price: 4.50 }]
    },
    {
      id: 'horchata', name: 'Horchata Drink', cat: 'Drinks', subcat: 'cold', emo: '🥤',
      img: img('photo-1546171753-97d7676e4602'), tags: ['veggie'], spice: false, off: 0.15,
      freeDelivery: true,
      desc: 'Sweet cinnamon rice milk served over ice.',
      ingr: ['Rice milk', 'Cinnamon', 'Sugar', 'Ice'],
      allergens: [], addons: [],
      sizes: [{ key: 'S', label: 'Small', price: 3.50 }, { key: 'L', label: 'Large', price: 4.25 }]
    },
    {
      id: 'secret-birria', name: 'Birria Tacos', cat: 'Tacos', subcat: 'beef', emo: '🌮', secret: true,
      img: img('photo-1565299507177-b0ac66763828'), tags: [], spice: true,
      desc: 'Slow-braised beef tacos with dipping consommé.',
      ingr: ['Birria beef', 'Corn tortillas', 'Onion', 'Cilantro', 'Consommé'],
      allergens: ['dairy'],
      addons: ['guac', 'jalapeno', 'cheese'],
      sizes: [{ key: '3', label: '3 pcs', price: 12.50 }, { key: '5', label: '5 pcs', price: 18.00 }]
    },
    {
      id: 'secret-nacho', name: 'Loaded Nachos', cat: 'Sides', subcat: 'nachos', emo: '🧀', secret: true,
      img: img('photo-1600891964092-4316c288032e'), tags: ['popular'], spice: false,
      desc: 'House nachos with cheese, jalapeños and pico de gallo.',
      ingr: ['Tortilla chips', 'Melted cheese', 'Jalapeños', 'Pico de gallo', 'Sour cream'],
      allergens: ['dairy'],
      addons: ['guac', 'chicken', 'jalapeno'],
      sizes: [{ key: 'S', label: 'Regular', price: 8.50 }]
    }
  ];

  const ITEM = Object.fromEntries(MENU_ITEMS.map(i => [i.id, i]));
  const isSecret = it => it.secret === true;

  /* ============================================================
     SECTION 3 · UTILITIES
     ============================================================ */
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const money = n => {
    const num = Number(n);
    return CONFIG.CURRENCY + (Number.isFinite(num) ? num : 0).toFixed(2);
  };

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  const load = (key, fallback) => {
    try { const raw = localStorage.getItem(key); if (raw === null) return fallback; return JSON.parse(raw) ?? fallback; }
    catch { return fallback; }
  };
  const persist = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };
  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  const today = () => new Date().toDateString();

  const isBirthday = birthday => {
    if (!birthday) return false;
    const b = new Date(birthday);
    if (isNaN(b.getTime())) return false;
    const now = new Date();
    return b.getMonth() === now.getMonth() && b.getDate() === now.getDate();
  };
  const currentHour = () => new Date().getHours();
  const isNightTime = () => currentHour() >= 22 || currentHour() < 6;

  /* ============================================================
     SECTION 4 · STATE
     ============================================================ */
  function sanitizeSpecial(s) {
    if (!s || typeof s !== 'object') return null;
    if (s.type === 'free') return { type: 'free' };
    if (s.type === 'fixed' && Number.isFinite(Number(s.price)) && Number(s.price) >= 0)
      return { type: 'fixed', price: Number(s.price) };
    if (s.type === 'percent' && Number.isFinite(Number(s.pct)) && s.pct > 0 && s.pct < 1)
      return { type: 'percent', pct: Number(s.pct) };
    return null;
  }

  function sanitizeLine(raw) {
    if (!raw || typeof raw !== 'object' || !ITEM[raw.id]) return null;
    const it = ITEM[raw.id];
    if (!it.sizes.some(s => s.key === raw.size)) return null;
    const addons = Array.isArray(raw.addons) ? raw.addons.filter(a => typeof a === 'string' && it.addons.includes(a)) : [];
    const spice = it.spice && SPICE_LEVELS.includes(raw.spice) ? raw.spice : null;
    const qty = Math.trunc(Number(raw.qty));
    if (!(qty >= 1 && qty <= CONFIG.MAX_QTY)) return null;
    return {
      uid: uid(), id: it.id, size: raw.size, spice, addons,
      note: String(raw.note ?? '').slice(0, 80), qty,
      special: sanitizeSpecial(raw.special)
    };
  }

  function sanitizeVoucher(v) {
    if (!v || typeof v !== 'object' || v.used) return null;
    if (v.type === 'percent' && Number.isFinite(v.pct) && v.pct > 0 && v.pct < 1) return v;
    if (v.type === 'delivery') return v;
    if (v.type === 'guac') return v;
    if (v.type === 'flat' && Number.isFinite(v.amount) && v.amount > 0) return v;
    return null;
  }

  function sanitizeReviews(raw) {
    if (!raw || typeof raw !== 'object') return {};
    const out = {};
    Object.keys(raw).forEach(itemId => {
      if (!ITEM[itemId]) return;
      const list = Array.isArray(raw[itemId]) ? raw[itemId] : [];
      const cleaned = list.filter(r =>
        r && typeof r === 'object' &&
        Number.isFinite(Number(r.stars)) && Number(r.stars) >= 1 && Number(r.stars) <= 5 &&
        typeof r.text === 'string'
      ).slice(-50).map(r => ({
        uid: typeof r.uid === 'string' ? r.uid.slice(0, 16) : uid(),
        name: String(r.name || 'Anonymous').slice(0, 30),
        stars: Math.round(Number(r.stars)),
        text: String(r.text).slice(0, 300),
        date: String(r.date || '').slice(0, 20)
      }));
      if (cleaned.length) out[itemId] = cleaned;
    });
    return out;
  }

  const state = {
    cart: (Array.isArray(load('tortilla_v2_cart', [])) ? load('tortilla_v2_cart', []) : []).map(sanitizeLine).filter(Boolean),
    orders: (Array.isArray(load('tortilla_v2_orders', [])) ? load('tortilla_v2_orders', []) : [])
      .filter(o => o && Array.isArray(o.items) && typeof o.id === 'number')
      .map(o => ({ ...o, status: Math.min(o.status ?? 3, 3), startedAt: o.startedAt || Date.now() })),
    customer: (() => { const c = load('tortilla_v2_customer', {}); return c && typeof c === 'object' ? c : {}; })(),
    filter: 'All',
    subcat: 'All',
    query: '',
    draft: null,
    reviewStars: 5,
    coupon: (() => {
      const c = load('tortilla_coupon', null);
      if (c && typeof c.code === 'string' && COUPONS[c.code]) return { code: c.code, pct: COUPONS[c.code] };
      return null;
    })(),
    couponInput: load('tortilla_coupon', null)?.code || '',
    couponMsg: '',
    stamps: Math.max(0, Math.min(CONFIG.STAMPS_FOR_REWARD, Number(load('tortilla_stamps', 0)) || 0)),
    freeBurrito: !!load('tortilla_free_burrito', false),
    points: Math.max(0, Number(load('tortilla_points', 0)) || 0),
    level: ['mild', 'medium', 'hot'].includes(load('tortilla_level', 'mild')) ? load('tortilla_level', 'mild') : 'mild',
    achievements: (Array.isArray(load('tortilla_achievements', [])) ? load('tortilla_achievements', []) : []).filter(a => a in ACHIEVEMENTS),
    lastSpin: String(load('tortilla_last_spin', '') || ''),
    lastScratch: String(load('tortilla_last_scratch', '') || ''),
    weather: load('tortilla_weather', null),
    chefSpecial: (() => {
      const c = load('tortilla_chef_special', null);
      if (c && typeof c === 'object' && ITEM[c.id] && Number.isFinite(c.discount) && c.discount > 0 && c.discount < 1) return c;
      return null;
    })(),
    liveCounts: load('tortilla_live_counts', {}) || {},
    vouchers: (Array.isArray(load('tortilla_vouchers', [])) ? load('tortilla_vouchers', []) : []).map(sanitizeVoucher).filter(Boolean),
    stats: (() => {
      const s = load('tortilla_stats', {});
      return {
        guacOrdered: Math.max(0, Number(s.guacOrdered) || 0),
        veggieOrdered: Math.max(0, Number(s.veggieOrdered) || 0),
        spicyItems: Array.isArray(s.spicyItems) ? s.spicyItems.filter(x => typeof x === 'string') : [],
        totalOrders: Math.max(0, Number(s.totalOrders) || 0)
      };
    })(),
    secretUnlocked: !!load('tortilla_secret_unlocked', false),
    birthdayApplied: String(load('tortilla_birthday_applied', '') || ''),
    ratings: sanitizeReviews(load('tortilla_ratings', {}))
  };

  const app = document.getElementById('app');
  const modal = document.getElementById('modal');
  const overlay = document.querySelector('.overlay');
  const toastEl = document.getElementById('toast');
  const confettiContainer = document.getElementById('confettiContainer');
  let toastTimer;

  /* ============================================================
     SECTION 5 · RATINGS
     ============================================================ */
  function getRating(itemId) {
    const list = state.ratings[itemId] || [];
    if (!list.length) return { avg: 0, count: 0 };
    const sum = list.reduce((s, r) => s + r.stars, 0);
    return { avg: sum / list.length, count: list.length };
  }

  function starsHtml(itemId, size = 13) {
    const { avg, count } = getRating(itemId);
    const filled = Math.round(avg);
    const stars = Array.from({ length: 5 }, (_, i) =>
      `<span class="s ${i < filled ? 'on' : ''}">★</span>`
    ).join('');
    const label = count > 0
      ? `<span class="rating-text">${avg.toFixed(1)} (${count})</span>`
      : `<span class="rating-text muted">No reviews</span>`;
    return `<span class="stars" style="font-size:${size}px" aria-label="${count > 0 ? avg.toFixed(1) + ' out of 5' : 'No reviews'}">${stars}${label}</span>`;
  }

  function submitReview(itemId) {
    const nameEl = document.getElementById('reviewName');
    const textEl = document.getElementById('reviewText');
    const stars = state.reviewStars;
    const text = (textEl?.value || '').trim();
    const name = (nameEl?.value || '').trim();
    if (text.length < 3) { toast('Please write at least a few words'); return; }
    if (!state.ratings[itemId]) state.ratings[itemId] = [];
    state.ratings[itemId].push({
      uid: uid(),
      name: name.slice(0, 30) || 'Anonymous',
      stars: Math.max(1, Math.min(5, stars)),
      text: text.slice(0, 300),
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    });
    persist('tortilla_ratings', state.ratings);
    toast('Thanks for your review! ⭐');
    showConfetti();
    renderModal();
  }

  function updateStarPicker() {
    document.querySelectorAll('#starPicker .star').forEach(s => {
      s.classList.toggle('on', Number(s.dataset.star) <= state.reviewStars);
    });
  }

  /* ============================================================
     SECTION 6 · PRICING
     ============================================================ */
  function basePrice(l) {
    const it = ITEM[l.id];
    const sizeP = it.sizes.find(s => s.key === l.size)?.price ?? 0;
    return sizeP + l.addons.reduce((s, a) => s + (ADDONS[a]?.price ?? 0), 0);
  }

  function unitPrice(l) {
    if (l.special?.type === 'free') return 0;
    if (l.special?.type === 'fixed') return l.special.price;
    const base = basePrice(l);
    const it = ITEM[l.id];
    let rate = it.off || 0;
    if (l.special?.type === 'percent') rate = Math.max(rate, l.special.pct);
    else if (state.coupon) rate = Math.max(rate, state.coupon.pct);
    return Math.round(base * (1 - rate) * 100) / 100;
  }

  function cartBase() { return state.cart.reduce((s, l) => s + basePrice(l) * l.qty, 0); }
  function cartTotal() { return state.cart.reduce((s, l) => s + unitPrice(l) * l.qty, 0); }
  function activeVouchers() { return state.vouchers.filter(v => !v.used); }
  function hasFreeDeliveryVoucher() { return activeVouchers().some(v => v.type === 'delivery'); }

  function deliveryFee(sub) {
    if (sub <= 0) return 0;
    if (sub >= CONFIG.FREE_DELIVERY_AT) return 0;
    if (state.cart.some(l => ITEM[l.id]?.freeDelivery)) return 0;
    if (hasFreeDeliveryVoucher()) return 0;
    return CONFIG.DELIVERY_FEE;
  }

  function flatVoucherDiscount() {
    return activeVouchers().filter(v => v.type === 'flat').reduce((s, v) => s + v.amount, 0);
  }

  function guacVoucherDiscount() {
    const vouchers = activeVouchers().filter(v => v.type === 'guac').length;
    if (!vouchers) return 0;
    let guacCount = 0;
    for (const l of state.cart) if (l.addons.includes('guac')) guacCount += l.qty;
    return Math.min(guacCount, vouchers) * ADDONS.guac.price;
  }

  function applyCoupon() {
    readForm();
    const code = (state.couponInput || '').trim().toUpperCase();
    if (!code) { state.coupon = null; state.couponMsg = 'Enter a coupon code'; persist('tortilla_coupon', null); }
    else if (COUPONS[code]) {
      state.coupon = { code, pct: COUPONS[code] };
      state.couponMsg = ''; state.couponInput = code;
      persist('tortilla_coupon', { code });
    } else { state.coupon = null; state.couponMsg = 'Invalid coupon code'; persist('tortilla_coupon', null); }
    refresh();
    toast(state.coupon ? 'Coupon applied 🎉' : state.couponMsg);
  }

  /* ============================================================
     SECTION 7 · UI HELPERS
     ============================================================ */
  function toast(msg) {
    const el = document.getElementById('toastMsg');
    if (!el) return;
    el.textContent = String(msg);
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  function cartCount() { return state.cart.reduce((s, l) => s + l.qty, 0); }

  function updateBadges() {
    const n = cartCount();
    document.querySelectorAll('[data-badge]').forEach(b => {
      const was = b.classList.contains('show');
      b.textContent = n;
      b.classList.toggle('show', n > 0);
      if (n > 0 && was && !reduceMotion.matches) {
        b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
      }
    });
  }

  function bumpCartIcon() {
    if (reduceMotion.matches) return;
    document.querySelectorAll('a[href="#/cart"].icon-btn, .nav-item[data-nav="cart"] .ic').forEach(el =>
      el.animate([
        { transform: 'translateY(0) scale(1)' },
        { transform: 'translateY(-6px) scale(1.15)' },
        { transform: 'translateY(0) scale(1)' }
      ], { duration: 400, easing: 'cubic-bezier(.34,1.56,.64,1)' })
    );
  }

  function commitCart() { persist('tortilla_v2_cart', state.cart); updateBadges(); }

  function showConfetti() {
    if (reduceMotion.matches || !confettiContainer) return;
    const colors = ['#C46144', '#FFD700', '#8BC34A', '#2196F3', '#9C27B0'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      confettiContainer.appendChild(piece);
      setTimeout(() => piece.remove(), 4500);
    }
  }

  function updateGreeting() {
    const el = document.getElementById('greet');
    if (!el) return;
    const name = (state.customer.name || '').trim();
    if (isBirthday(state.customer.birthday) && name) el.innerHTML = `🎂 Happy Birthday <b>${esc(name)}!</b>`;
    else el.innerHTML = name ? `Hi, <b>${esc(name)}</b>` : 'Welcome 👋';
  }

  /* ============================================================
     SECTION 8 · FORM
     ============================================================ */
  function readForm() {
    const map = {
      name: 'fName', phone: 'fPhone', area: 'fArea', street: 'fStreet',
      building: 'fBuilding', floor: 'fFloor', apt: 'fApt', birthday: 'fBirthday'
    };
    for (const [k, id] of Object.entries(map)) {
      const el = document.getElementById(id);
      if (el) state.customer[k] = el.value.trim().slice(0, 60);
    }
    const c = document.getElementById('coupon');
    if (c) state.couponInput = c.value.trim();
  }

  function validateForm() {
    readForm();
    const c = state.customer;
    if (!c.name || c.name.length < 2) return { ok: false, field: 'fName', msg: 'Please enter your name.' };
    const phone = (c.phone || '').replace(/[\s-]/g, '');
    if (!/^\+?\d{8,15}$/.test(phone)) return { ok: false, field: 'fPhone', msg: 'Enter a valid phone number (8–15 digits).' };
    const req = [
      ['area', 'fArea', 'Area'], ['street', 'fStreet', 'Street'],
      ['building', 'fBuilding', 'Building'], ['floor', 'fFloor', 'Floor'], ['apt', 'fApt', 'Apartment']
    ];
    for (const [k, id, label] of req) if (!c[k]) return { ok: false, field: id, msg: `${label} is required.` };
    return { ok: true };
  }

  /* ============================================================
     SECTION 9 · UI COMPONENTS
     ============================================================ */
  function fromPrice(it) { return Math.min(...it.sizes.map(s => s.price)); }

  function priceHtml(it) {
    if (it.off) return `<span class="price-wrap"><s class="old">${money(fromPrice(it))}</s><span class="new">${money(fromPrice(it) * (1 - it.off))}</span></span>`;
    return `<span class="price"><span class="from">${it.sizes.length > 1 ? 'from ' : ''}</span>${money(fromPrice(it))}</span>`;
  }

  function card(it, i) {
    const tags = [
      it.tags.includes('popular') ? `<span class="tag hot">🔥 Popular</span>` : '',
      ...it.tags.filter(t => t !== 'popular').map(t => `<span class="tag">${TAGS[t] || ''}</span>`),
      it.freeDelivery ? `<span class="tag freedel">🚚 Free Delivery</span>` : '',
      it.secret ? `<span class="tag secret">🤫 Secret</span>` : ''
    ].join('');
    const liveCount = state.liveCounts[it.id] || 0;
    const liveBadge = liveCount > 5 ? `<span class="live-counter"><span class="live-dot"></span>${liveCount} ordered</span>` : '';

    return `
      <article class="card" data-action="open" data-id="${esc(it.id)}" style="--i:${i}" tabindex="0" role="button" aria-label="View ${esc(it.name)}">
        <div class="ph">
          <div class="tag-row">${tags}${liveBadge}</div>
          <span class="emo" aria-hidden="true">${it.emo}</span>
          <img src="${esc(it.img)}" alt="" loading="lazy" data-fallback>
        </div>
        <h4>${esc(it.name)}</h4>
        <div class="card-rating">${starsHtml(it.id)}</div>
        <p class="sub">${esc(it.desc)}</p>
        <div class="card-foot">
          ${priceHtml(it)}
          <button class="add" data-action="quick" data-id="${esc(it.id)}" aria-label="Quick add ${esc(it.name)}">+</button>
        </div>
      </article>`;
  }

  function renderLoadingFact() {
    const fact = LOADING_FACTS[Math.floor(Math.random() * LOADING_FACTS.length)];
    return `<div class="fact-banner"><span class="emoji">${fact.emoji}</span><span>${esc(fact.text)}</span></div>`;
  }

  function renderWeatherCard() {
    if (!state.weather || !state.weather.main) return '';
    const w = state.weather;
    const temp = Math.round(w.main.temp - 273.15);
    if (!Number.isFinite(temp)) return '';
    const wMain = (w.weather && w.weather[0] && w.weather[0].main || '').toLowerCase();
    const icon = wMain.includes('cloud') ? '☁️' : wMain.includes('rain') ? '🌧️' : wMain.includes('clear') ? '☀️' : '🌤️';
    let suggestion = 'Perfect weather for our California Burrito! 🌯';
    if (temp > 25) suggestion = 'Hot day? Try our refreshing Horchata! 🥤';
    else if (temp < 15) suggestion = 'Cold weather? Warm up with our Beef Barbacoa Burrito! 🌯';
    return `<div class="weather-card"><div class="weather-icon">${icon}</div><div class="weather-info"><h4>${temp}°C in ${esc(w.name || '')}</h4><p>${esc(suggestion)}</p></div></div>`;
  }

  function renderStampCard() {
    const n = state.stamps;
    const cells = Array.from({ length: CONFIG.STAMPS_FOR_REWARD }, (_, i) =>
      `<div class="stamp ${i < n ? 'filled' : 'empty'}" aria-hidden="true">${i < n ? '🌯' : '⭕'}</div>`
    ).join('');
    return `
      <div class="stamp-card">
        <h3>🎫 Loyalty Card</h3>
        <p>Collect ${CONFIG.STAMPS_FOR_REWARD} stamps, get a FREE Burrito!</p>
        <div class="stamps-grid" role="img" aria-label="${n} of ${CONFIG.STAMPS_FOR_REWARD} stamps">${cells}</div>
        <p class="stamp-progress"><strong>${n}/${CONFIG.STAMPS_FOR_REWARD}</strong> stamps collected</p>
        ${state.freeBurrito ? '<button class="btn btn-primary" data-action="claim-free">Claim Free Burrito 🌯</button>' : ''}
      </div>`;
  }

  function renderPointsCard() {
    const p = state.points, lvl = state.level;
    const nextLevel = lvl === 'mild' ? 50 : lvl === 'medium' ? 150 : 300;
    const progress = Math.min(100, (p / Math.max(nextLevel, 1)) * 100);
    const names = { mild: '🌶️ Mild Fan', medium: '🌶️🌶️ Medium Lover', hot: '🌶️🌶️🌶️ Hot Head' };
    return `
      <div class="points-card">
        <span class="level-badge level-${esc(lvl)}">${names[lvl]}</span>
        <div class="points-display">${p} pts</div>
        <p class="muted">${CONFIG.POINTS_PER_POUND} point per ${esc(CONFIG.CURRENCY)}1 spent</p>
        <div class="points-progress"><i style="width:${progress}%"></i></div>
        <p class="muted">${Math.max(0, nextLevel - p)} points to next level</p>
        ${p >= CONFIG.POINTS_FOR_DISCOUNT ? `<button class="btn btn-primary btn-block" data-action="redeem-points">Redeem ${CONFIG.POINTS_FOR_DISCOUNT} pts for ${esc(CONFIG.CURRENCY)}${CONFIG.DISCOUNT_VALUE} off</button>` : ''}
      </div>`;
  }

  function renderVouchers() {
    const active = activeVouchers();
    if (!active.length) return '';
    const label = v => {
      if (v.type === 'percent') return `${Math.round(v.pct * 100)}% Off`;
      if (v.type === 'delivery') return 'Free Delivery';
      if (v.type === 'guac') return 'Free Guacamole';
      if (v.type === 'flat') return `${money(v.amount)} Off`;
      return 'Voucher';
    };
    const emoji = v => v.type === 'delivery' ? '🚚' : v.type === 'guac' ? '🥑' : v.type === 'flat' ? '💷' : '🎟️';
    return `
      <div class="points-card">
        <h3 style="font-family:var(--serif);font-size:22px;margin-bottom:8px">🎁 Your Vouchers</h3>
        <div class="voucher-list">
          ${active.map(v => `
            <div class="voucher-item"><span class="v-emoji">${emoji(v)}</span><div class="v-text"><strong>${esc(label(v))}</strong><small>Applied automatically at checkout</small></div></div>`).join('')}
        </div>
      </div>`;
  }

  function renderSpinCard() {
    const canSpin = state.lastSpin !== today();
    return `
      <div class="spin-card">
        <h3>🎡 Daily Spin</h3>
        <p style="font-size:13px;opacity:.9;margin-bottom:6px">${canSpin ? 'Win a voucher — spin once a day!' : 'Come back tomorrow for another spin!'}</p>
        ${canSpin ? `<div class="wheel-container"><div class="wheel-pointer"></div><div class="wheel" id="wheel"></div></div>
          <button class="btn btn-light" data-action="spin-wheel" style="padding:10px 22px;font-size:14px">Spin Now!</button>` : ''}
      </div>`;
  }

  function renderScratchCard() {
    const canScratch = state.lastScratch !== today();
    if (!canScratch) {
      return `<div class="scratch-card"><h3 style="font-family:var(--serif);font-size:20px;margin-bottom:8px">🎰 Scratch Card</h3><p style="opacity:.9;font-size:14px">Come back tomorrow for a fresh scratch card!</p></div>`;
    }
    return `
      <div class="scratch-card">
        <h3 style="font-family:var(--serif);font-size:20px;margin-bottom:8px">🎰 Scratch Card</h3>
        <p style="opacity:.9;font-size:13px;margin-bottom:6px">Tap to reveal your prize!</p>
        <div class="scratch-area" id="scratchArea" data-action="scratch" role="button" tabindex="0" aria-label="Scratch card">
          <div class="scratch-prize" id="scratchPrize">❓</div>
          <div class="scratch-cover" id="scratchCover">SCRATCH</div>
        </div>
      </div>`;
  }

  function renderMysteryCard() {
    const price = 6.00;
    return `
      <div class="mystery-card">
        <h3 style="font-family:var(--serif);font-size:20px;margin-bottom:8px">🎁 Mystery Burrito</h3>
        <p style="opacity:.9;font-size:13px">A surprise burrito at a special price</p>
        <div class="mystery-emoji">❓</div>
        <button class="btn btn-light" data-action="add-mystery" style="padding:10px 22px;font-size:14px">Add · ${money(price)}</button>
      </div>`;
  }

  function renderChefSpecial() {
    if (!state.chefSpecial) {
      const candidates = MENU_ITEMS.filter(i => !isSecret(i));
      const pick = candidates[Math.floor(Math.random() * candidates.length)];
      state.chefSpecial = { id: pick.id, discount: 0.25 };
      persist('tortilla_chef_special', state.chefSpecial);
    }
    const item = ITEM[state.chefSpecial.id];
    if (!item) return '';
    const price = fromPrice(item);
    const discounted = price * (1 - state.chefSpecial.discount);
    return `
      <div class="chef-special">
        <h3>👨‍🍳 Today's Chef Special</h3>
        <p style="opacity:.92">${esc(item.name)}</p>
        <div class="special-price"><s>${money(price)}</s>${money(discounted)}</div>
        <button class="btn btn-light" data-action="add-special" style="padding:10px 22px;font-size:14px;align-self:flex-start">Add Special</button>
      </div>`;
  }

  function renderAchievements() {
    const badges = Object.entries(ACHIEVEMENTS).map(([key, b]) => {
      const earned = state.achievements.includes(key);
      return `<div class="achievement ${earned ? '' : 'locked'}" title="${esc(b.description)}"><div class="badge-icon">${b.icon}</div><div class="badge-name">${esc(b.name)}</div></div>`;
    }).join('');
    return `<div style="margin-top:18px"><h3 class="h-title">🏆 Achievements</h3><div class="achievements-grid">${badges}</div></div>`;
  }

  function renderCombos() {
    return `
      ${COMBOS.map((c, i) => {
        const names = c.items.map(id => ITEM[id]?.name).filter(Boolean).join(' + ');
        return `
          <button class="combo-card" data-action="add-combo" data-index="${i}">
            <div class="combo-user">${esc(c.user)} · ${esc(c.label)}</div>
            <div class="combo-items">${esc(names)}</div>
          </button>`;
      }).join('')}`;
  }

  function renderSecretBox() {
    if (state.secretUnlocked) {
      return `<div class="secret-box" style="border-color:var(--success)"><h3>🤫 Secret Menu Unlocked</h3><p>Look for the secret items in the menu — marked with a black badge.</p><a href="#/menu" class="btn btn-light">View Menu</a></div>`;
    }
    return `
      <div class="secret-box">
        <h3>🤫 Secret Menu</h3>
        <p>Enter the secret code or place ${CONFIG.SECRET_ORDERS_NEEDED} orders to unlock</p>
        <div class="secret-input-row">
          <input type="text" id="secretCode" placeholder="Enter code" maxlength="20" autocomplete="off" aria-label="Secret code">
          <button data-action="unlock-secret">Unlock</button>
        </div>
        <p style="margin-top:10px;font-size:12px;opacity:.6">Progress: ${Math.min(state.stats.totalOrders, CONFIG.SECRET_ORDERS_NEEDED)}/${CONFIG.SECRET_ORDERS_NEEDED} orders</p>
      </div>`;
  }

  /* ============================================================
     SECTION 10 · VIEWS
     ============================================================ */
  function viewHome() {
    const popular = MENU_ITEMS.filter(i => !isSecret(i) && i.tags.includes('popular'));
    const others = MENU_ITEMS.filter(i => !isSecret(i) && !i.tags.includes('popular'));
    const picks = popular.concat(others).slice(0, 6);
    const freeDeliveryItems = MENU_ITEMS.filter(i => !isSecret(i) && i.freeDelivery).slice(0, 4);

    const sub = cartTotal();
    const remaining = Math.max(0, CONFIG.FREE_DELIVERY_AT - sub);
    const pct = Math.min(100, (sub / CONFIG.FREE_DELIVERY_AT) * 100);
    const hasFreeDel = hasFreeDeliveryVoucher();

    return `
      ${renderWeatherCard()}
      ${renderLoadingFact()}

      <button class="deliver" data-action="address">
        <span style="display:flex;align-items:center;gap:14px">
          <span class="di"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
          <span><small>Deliver to</small><strong>${esc(state.customer.area || 'Set your address')}</strong></span>
        </span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <section class="hero">
        <div class="hero-text">
          <h2><span>FRESH.</span><br><span>CALIFORNIAN.</span><br><span>FEARLESS.</span></h2>
          <p>Burritos, tacos &amp; bowls, made your way.</p>
          <a href="#/menu" class="btn btn-light">Order Now →</a>
        </div>
        <span class="hero-emoji" aria-hidden="true">🌯</span>
      </section>

      <div class="perk">
        <div class="perk-row">
          <span>${hasFreeDel ? '🎉 Free delivery voucher active' : remaining > 0 ? `Add ${money(remaining)} for free delivery` : '🎉 Free delivery unlocked'}</span>
          <strong>${money(Math.min(sub, CONFIG.FREE_DELIVERY_AT))} / ${money(CONFIG.FREE_DELIVERY_AT)}</strong>
        </div>
        <div class="bar"><i style="width:${pct}%"></i></div>
      </div>

      <div class="sec-head"><h2><span class="ico">🔥</span>Popular Picks</h2><a href="#/menu">View all →</a></div>
      <div class="grid scroll">${picks.map(card).join('')}</div>

      <div class="sec-head"><h2><span class="ico">🗂️</span>Browse Categories</h2></div>
      <div class="chips">
        ${CATS.map(c => `<a class="chip" href="#/menu" data-cat="${esc(c.id)}"><span>${c.icon}</span>${esc(c.id)}</a>`).join('')}
      </div>

      ${freeDeliveryItems.length ? `
        <div class="sec-head"><h2><span class="ico">🚚</span>Free Delivery Items</h2><a href="#/menu">See more →</a></div>
        <div class="grid scroll">${freeDeliveryItems.map(card).join('')}</div>
      ` : ''}

      <div class="sec-head"><h2><span class="ico">🎁</span>Today's Deals</h2></div>
      <div class="reward-row">
        ${renderChefSpecial()}
        ${renderMysteryCard()}
      </div>

      <div class="sec-head"><h2><span class="ico">🎮</span>Daily Rewards</h2></div>
      <div class="reward-row">
        ${renderSpinCard()}
        ${renderScratchCard()}
      </div>

      <div class="sec-head"><h2><span class="ico">👥</span>Community Combos</h2></div>
      <div style="margin-bottom:8px">${renderCombos()}</div>

      ${renderSecretBox()}
    `;
  }

  function filteredItems() {
    const q = state.query.trim().toLowerCase();
    const isCategoryFilter = state.filter !== 'All' && !state.filter.startsWith('tag:');
    return MENU_ITEMS.filter(it => {
      if (isSecret(it) && !state.secretUnlocked) return false;
      const f = state.filter;
      const okFilter = f === 'All'
        || it.cat === f
        || (f.startsWith('tag:') && it.tags.includes(f.slice(4)));
      const okSub = !isCategoryFilter || state.subcat === 'All' || it.subcat === state.subcat;
      const okQuery = !q
        || it.name.toLowerCase().includes(q)
        || it.ingr.some(x => x.toLowerCase().includes(q));
      return okFilter && okSub && okQuery;
    });
  }

  function viewMenu() {
    const list = filteredItems();
    const isCategoryFilter = state.filter !== 'All' && !state.filter.startsWith('tag:');
    const subs = isCategoryFilter ? (SUBCATS[state.filter] || []) : [];
    const chip = (val, label) => `<button class="chip ${state.filter === val ? 'active' : ''}" data-action="filter" data-val="${esc(val)}">${label}</button>`;
    const subChip = (val, label) => `<button class="chip sub ${state.subcat === val ? 'active' : ''}" data-action="subfilter" data-val="${esc(val)}">${label}</button>`;

    return `
      <h3 class="h-title">Our Menu</h3>
      <div class="search"><input type="text" id="search" placeholder="Search burritos, chicken, guacamole…" value="${esc(state.query)}" aria-label="Search menu"></div>
      <div class="chips">
        ${chip('All', '🍽️ All')}
        ${CATS.map(c => chip(c.id, `${c.icon} ${esc(c.id)}`)).join('')}
        ${Object.entries(TAGS).map(([k, v]) => chip('tag:' + k, v)).join('')}
      </div>
      ${subs.length ? `
        <div class="chips subcat">
          ${subChip('All', 'All')}
          ${subs.map(s => subChip(s.id, esc(s.label))).join('')}
        </div>
      ` : ''}
      <div class="grid" data-grid>
        ${list.length ? list.map(card).join('') : '<p class="empty-search">No dishes match your search.</p>'}
      </div>`;
  }

  function lineOptions(l) {
    const it = ITEM[l.id];
    const parts = [it.sizes.find(s => s.key === l.size)?.label || ''];
    if (l.spice) parts.push(l.spice);
    l.addons.forEach(a => parts.push('+ ' + (ADDONS[a]?.name || '')));
    if (l.special?.type === 'percent') parts.push(`${Math.round(l.special.pct * 100)}% off`);
    return parts.filter(Boolean).join(' · ');
  }

  function viewCart() {
    if (!state.cart.length) {
      return `<div class="empty"><div class="big">🛒</div><h2>Your cart is empty</h2><p>Looks like you haven't added anything yet.</p><a href="#/menu" class="btn btn-primary">Browse Menu</a></div>`;
    }

    const subtotal = cartTotal();
    const base = cartBase();
    const couponSavings = Math.max(0, base - subtotal);
    const delivery = deliveryFee(subtotal);
    const flat = Math.min(flatVoucherDiscount(), subtotal);
    const guac = Math.min(guacVoucherDiscount(), Math.max(0, subtotal - flat));
    const finalTotal = Math.max(0, subtotal + delivery - flat - guac);
    const c = state.customer;
    const cv = k => esc(c[k] || '');

    return `
      <h3 class="h-title">Your Order</h3>
      <div class="cart-layout">
        <div class="cart-list">
          ${state.cart.map(l => {
            const it = ITEM[l.id];
            const unit = unitPrice(l);
            const lineTotal = unit * l.qty;
            const rawUnit = basePrice(l);
            const showOld = rawUnit > unit + 0.001;
            const priceHtml = showOld
              ? `<s class="old">${money(rawUnit * l.qty)}</s><span class="new">${l.special?.type === 'free' ? 'FREE' : money(lineTotal)}</span>`
              : l.special?.type === 'free' ? `<span class="free-pill">FREE</span>` : money(lineTotal);
            return `
              <div class="line" data-line="${esc(l.uid)}">
                <div class="thumb" aria-hidden="true">${it.emo}</div>
                <div class="info">
                  <h4>${esc(it.name)}</h4>
                  <div class="opts">${esc(lineOptions(l))}</div>
                  ${l.note ? `<div class="note">"${esc(l.note)}"</div>` : ''}
                  <div class="lp">${priceHtml}</div>
                </div>
                <div class="qty">
                  <button data-action="qty" data-uid="${esc(l.uid)}" data-d="-1" aria-label="Decrease">−</button>
                  <span>${l.qty}</span>
                  <button data-action="qty" data-uid="${esc(l.uid)}" data-d="1" aria-label="Increase">+</button>
                </div>
              </div>`;
          }).join('')}
        </div>

        <aside class="summary">
          <h3>Summary</h3>
          <div class="coupon">
            <input type="text" id="coupon" placeholder="Coupon code" value="${esc(state.couponInput)}" aria-label="Coupon code" maxlength="30">
            <button class="btn-mini" data-action="apply-coupon">Apply</button>
          </div>
          <p class="cmsg ${state.coupon ? 'ok' : ''}">${state.coupon ? `Coupon ${esc(state.coupon.code)} · ${Math.round(state.coupon.pct * 100)}% off` : esc(state.couponMsg || '')}</p>

          <div class="row"><span>Subtotal</span><span>${couponSavings > 0.001 ? `<s class="old">${money(base)}</s> ` : ''}${money(subtotal)}</span></div>
          ${couponSavings > 0.001 ? `<div class="row save"><span>Item discounts</span><span>−${money(couponSavings)}</span></div>` : ''}
          <div class="row"><span>Delivery fee</span><span>${delivery ? money(delivery) : '<b class="free">Free</b>'}</span></div>
          ${flat > 0 ? `<div class="row save"><span>Voucher (flat)</span><span>−${money(flat)}</span></div>` : ''}
          ${guac > 0 ? `<div class="row save"><span>Free guacamole</span><span>−${money(guac)}</span></div>` : ''}
          <div class="row total"><span>Total</span><span>${money(finalTotal)}</span></div>
          ${delivery && subtotal < CONFIG.FREE_DELIVERY_AT ? `<p class="free-note">Add ${money(CONFIG.FREE_DELIVERY_AT - subtotal)} more for free delivery</p>` : ''}

          <div class="pay"><span aria-hidden="true">💵</span><div><strong>Cash on delivery only</strong><small>Pay the driver in cash when your order arrives.</small></div></div>

          <h4 class="sec">Delivery details</h4>
          <div class="fgrid">
            <input type="text" id="fName" placeholder="Full name *" autocomplete="name" value="${cv('name')}" maxlength="60">
            <input type="tel" id="fPhone" placeholder="Phone number *" inputmode="tel" autocomplete="tel" value="${cv('phone')}" maxlength="20">
            <input type="text" id="fArea" placeholder="Area / district *" value="${cv('area')}" maxlength="60">
            <input type="text" id="fStreet" placeholder="Street *" value="${cv('street')}" maxlength="60">
            <div class="f3">
              <input type="text" id="fBuilding" placeholder="Building *" value="${cv('building')}" maxlength="20">
              <input type="text" id="fFloor" placeholder="Floor *" value="${cv('floor')}" maxlength="10">
              <input type="text" id="fApt" placeholder="Apt *" value="${cv('apt')}" maxlength="10">
            </div>
            <input type="date" id="fBirthday" value="${cv('birthday')}">
          </div>
          <p class="ferr" id="ferr" role="alert"></p>
          <button class="btn btn-primary btn-block" data-action="checkout">Place Order · Cash</button>
        </aside>
      </div>`;
  }

  function viewOrders() {
    if (!state.orders.length) {
      return `<div class="empty"><div class="big">📄</div><h2>No orders yet</h2><p>Your orders will show up here.</p><a href="#/menu" class="btn btn-primary">Order Now</a></div>`;
    }
    return `
      <h3 class="h-title">Order History</h3>
      <div class="orders stagger">
        ${state.orders.map((o, i) => {
          const live = o.status < 3;
          const canReorder = o.status === 3;
          const canRate = o.status === 3;
          return `
            <div class="order" style="--i:${i}">
              <div class="order-head">
                <div><h4>Order #${esc(String(o.id))}</h4><small class="muted">${esc(o.date || '')}</small></div>
                <span class="status ${live ? 'live' : ''}">${esc(STATUSES[o.status] || '')}</span>
              </div>
              <div class="steps">${STATUSES.map((s, idx) => `<span class="${idx <= o.status ? 'on' : ''}">${esc(s)}</span>`).join('')}</div>
              <div class="bar"><i style="width:${(o.status / 3) * 100}%"></i></div>
              <div style="margin-top:14px">
                ${o.items.map(it => `<div class="order-line"><span>${Number(it.qty) || 0}× ${esc(it.name || '')}${it.details ? `<br><small class="muted">${esc(it.details)}</small>` : ''}</span><strong>${money((Number(it.price) || 0) * (Number(it.qty) || 0))}</strong></div>`).join('')}
              </div>
              <div class="order-total">Total: ${money(o.total)}</div>
              <div class="order-actions">
                ${canReorder ? `<button class="btn btn-secondary reorder-btn" data-action="reorder" data-order-id="${esc(String(o.id))}">⚡ Reorder</button>` : ''}
                ${canRate ? `<button class="btn btn-secondary reorder-btn" data-action="rate-order" data-order-id="${esc(String(o.id))}">⭐ Rate items</button>` : ''}
              </div>
            </div>`;
        }).join('')}
      </div>`;
  }

  function viewProfile() {
    return `
      <div class="profile">
        <div class="avatar" aria-hidden="true">👤</div>
        <h2 style="font-family:var(--serif);font-size:30px">${state.customer.name ? esc(state.customer.name) : 'Guest User'}</h2>
        <p class="muted">Save your name so we can greet you every time</p>

        <div class="name-box">
          <label for="pName">Your name</label>
          <div class="name-row">
            <input type="text" id="pName" placeholder="e.g. Ahmed" maxlength="40" value="${esc(state.customer.name || '')}">
            <button class="btn btn-primary" data-action="save-name">Save</button>
          </div>
        </div>

        ${renderStampCard()}
        ${renderPointsCard()}
        ${renderVouchers()}
        ${renderAchievements()}

        <div class="menu-card">
          <button class="menu-row" data-action="go" data-to="#/orders">Order History <span>→</span></button>
          <button class="menu-row" data-action="toast" data-msg="Help center coming soon">Help &amp; Support <span>→</span></button>
        </div>
      </div>`;
  }

  const VIEWS = { home: viewHome, menu: viewMenu, cart: viewCart, orders: viewOrders, profile: viewProfile };

  /* ============================================================
     SECTION 11 · ROUTER
     ============================================================ */
  const currentRoute = () => {
    const r = location.hash.replace(/^#\/?/, '');
    return VIEWS[r] ? r : 'home';
  };
  let lastRoute = null;

  function setActiveNav(r) {
    document.querySelectorAll('[data-nav]').forEach(el => {
      const on = el.dataset.nav === r;
      el.classList.toggle('active', on);
      if (on) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
  }

  function render() {
    const r = currentRoute();
    const changed = r !== lastRoute;
    lastRoute = r;
    setActiveNav(r);
    const scrollY = changed ? 0 : window.scrollY;
    app.innerHTML = VIEWS[r]();
    if (changed) {
      app.classList.remove('anim'); void app.offsetWidth; app.classList.add('anim');
    }
    window.scrollTo(0, scrollY);
    updateBadges();
    updateGreeting();
  }

  function refresh() {
    readForm();
    const scrollY = window.scrollY;
    const focusId = document.activeElement && document.activeElement.id;
    app.innerHTML = VIEWS[currentRoute()]();
    if (focusId) {
      const el = document.getElementById(focusId);
      if (el && typeof el.focus === 'function') {
        el.focus();
        if (typeof el.setSelectionRange === 'function' && typeof el.value === 'string') {
          try { el.setSelectionRange(el.value.length, el.value.length); } catch {}
        }
      }
    }
    window.scrollTo(0, scrollY);
    updateBadges();
    updateGreeting();
  }

  /* ============================================================
     SECTION 12 · MODAL (with reviews)
     ============================================================ */
  let lastFocused = null;

  function openItem(id) {
    const it = ITEM[id];
    if (!it) return;
    if (isSecret(it) && !state.secretUnlocked) return;
    state.draft = {
      id: it.id, size: it.sizes[0].key, spice: it.spice ? 'Medium' : null,
      addons: [], note: '', qty: 1, special: null
    };
    state.reviewStars = 5;
    lastFocused = document.activeElement;
    renderModal();
    modal.classList.add('show');
    overlay.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  }

  function closeModal() {
    modal.classList.remove('show');
    overlay.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    state.draft = null;
    if (lastFocused && typeof lastFocused.focus === 'function') {
      try { lastFocused.focus({ preventScroll: true }); } catch {}
    }
    lastFocused = null;
  }

  function draftPrice() {
    if (!state.draft) return 0;
    return unitPrice({ ...state.draft, qty: 1 }) * state.draft.qty;
  }

  function renderModal() {
    if (!state.draft) return;
    const d = state.draft, it = ITEM[d.id];
    if (!it) return;
    const allergens = [...new Set([...it.allergens, ...d.addons.flatMap(a => ADDONS[a]?.allergens || [])])];
    const reviews = state.ratings[it.id] || [];
    const rating = getRating(it.id);

    document.getElementById('mBody').innerHTML = `
      <button class="close" data-action="close-modal" aria-label="Close dialog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      <div class="mpic"><span aria-hidden="true">${it.emo}</span><img src="${esc(it.img)}" alt="" data-fallback></div>
      <h2 id="mTitle">${esc(it.name)}</h2>
      <div class="modal-rating">${starsHtml(it.id, 16)}</div>
      <p class="desc">${esc(it.desc)}</p>
      <div class="ingr">${it.ingr.map(x => `<span>${esc(x)}</span>`).join('')}</div>
      ${allergens.length ? `<div class="allergy">Contains: ${allergens.map(a => ALLERGENS[a] || esc(a)).join(' · ')}</div>` : ''}

      <div class="group"><h5>Size</h5>
        ${it.sizes.map(s => `
          <label class="opt ${d.size === s.key ? 'sel' : ''}">
            <span class="meta"><strong>${esc(s.label)}</strong></span>
            <span class="pr">${money(s.price)}</span>
            <input type="radio" name="size" value="${esc(s.key)}" ${d.size === s.key ? 'checked' : ''} hidden>
          </label>`).join('')}
      </div>

      ${it.spice ? `
        <div class="group"><h5>Spice level</h5>
          <div class="pillrow">
            ${SPICE_LEVELS.map((sp, idx) => `
              <label class="opt ${d.spice === sp ? 'sel' : ''}">
                <span>${'🌶'.repeat(idx + 1)} ${esc(sp)}</span>
                <input type="radio" name="spice" value="${esc(sp)}" ${d.spice === sp ? 'checked' : ''} hidden>
              </label>`).join('')}
          </div>
        </div>` : ''}

      ${it.addons.length ? `
        <div class="group"><h5>Add-ons</h5>
          ${it.addons.map(a => `
            <label class="opt ${d.addons.includes(a) ? 'sel' : ''}">
              <span class="meta"><strong>${esc(ADDONS[a].name)}</strong>${ADDONS[a].allergens.length ? `<small>${ADDONS[a].allergens.map(x => ALLERGENS[x]).join(' ')}</small>` : ''}</span>
              <span class="pr">+${money(ADDONS[a].price)}</span>
              <input type="checkbox" name="addon" value="${esc(a)}" ${d.addons.includes(a) ? 'checked' : ''} hidden>
            </label>`).join('')}
        </div>` : ''}

      <div class="group"><h5>Note for the kitchen</h5>
        <textarea class="note-input" id="noteInput" maxlength="80" placeholder="e.g. no onions, sauce on the side">${esc(d.note)}</textarea>
      </div>

      <div class="reviews-section">
        <div class="reviews-header">
          <h4>Reviews <span class="reviews-summary">${rating.count > 0 ? `${rating.avg.toFixed(1)} · ${rating.count} review${rating.count > 1 ? 's' : ''}` : 'No reviews yet'}</span></h4>
          <button class="btn btn-secondary" style="padding:8px 16px;font-size:13px" data-action="toggle-review">Write review</button>
        </div>
        <div id="reviewsList">
          ${reviews.length === 0
            ? `<div class="no-reviews">Be the first to review this item ⭐</div>`
            : reviews.slice().reverse().map(r => `
              <div class="review-item">
                <div class="review-head">
                  <div>
                    <div class="review-author">${esc(r.name)}</div>
                    <span class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</span>
                  </div>
                  <span class="review-date">${esc(r.date)}</span>
                </div>
                <p class="review-text">${esc(r.text)}</p>
              </div>`).join('')}
        </div>
        <div class="review-form" id="reviewForm" hidden>
          <h6>Your rating</h6>
          <div class="star-picker" id="starPicker">
            ${[1,2,3,4,5].map(i => `<button type="button" class="star ${i <= state.reviewStars ? 'on' : ''}" data-action="pick-star" data-star="${i}" aria-label="${i} star${i>1?'s':''}">★</button>`).join('')}
          </div>
          <input type="text" id="reviewName" placeholder="Your name (optional)" maxlength="30" autocomplete="nickname">
          <textarea id="reviewText" placeholder="What did you think? (required)" maxlength="300"></textarea>
          <div class="review-form-actions">
            <button class="btn btn-secondary" data-action="cancel-review" style="padding:10px 18px;font-size:14px">Cancel</button>
            <button class="btn btn-primary" data-action="submit-review" style="padding:10px 18px;font-size:14px">Submit</button>
          </div>
        </div>
      </div>

      <div class="modal-foot" style="margin-top:16px">
        <div class="qty big">
          <button data-action="mqty" data-d="-1" aria-label="Decrease">−</button>
          <span id="mQty">${d.qty}</span>
          <button data-action="mqty" data-d="1" aria-label="Increase">+</button>
        </div>
        <div class="modal-price" id="mPrice">${money(draftPrice())}</div>
        <button class="btn btn-primary" data-action="madd">Add to Cart</button>
      </div>`;
  }

  function updateModalTotals() {
    const q = document.getElementById('mQty');
    const p = document.getElementById('mPrice');
    if (q && state.draft) q.textContent = state.draft.qty;
    if (p) p.textContent = money(draftPrice());
  }

  /* ============================================================
     SECTION 13 · CART OPERATIONS
     ============================================================ */
  const lineKey = l => [l.id, l.size, l.spice ?? '', [...l.addons].sort().join(','), l.note || '', l.special?.type || ''].join('|');

  function mergeToCart(line) {
    const key = lineKey(line);
    const existing = state.cart.find(l => lineKey(l) === key);
    if (existing) existing.qty = Math.min(CONFIG.MAX_QTY, existing.qty + line.qty);
    else state.cart.push({ ...line, uid: uid() });
    commitCart();
  }

  function commitDraft() {
    const d = state.draft;
    if (!d) return;
    mergeToCart({
      id: d.id, size: d.size, spice: d.spice, addons: [...d.addons].sort(),
      note: d.note.trim(), qty: d.qty, special: null
    });
    bumpCartIcon();
    toast(`${d.qty}× ${ITEM[d.id].name} added`);
  }

  function changeLineQty(uidValue, delta) {
    const l = state.cart.find(x => x.uid === uidValue);
    if (!l) return;
    l.qty = Math.min(CONFIG.MAX_QTY, l.qty + delta);
    if (l.qty <= 0) state.cart = state.cart.filter(x => x !== l);
    commitCart();
    if (currentRoute() === 'cart') refresh(); else updateBadges();
  }

  /* ============================================================
     SECTION 14 · LOYALTY
     ============================================================ */
  function addStamp() {
    state.stamps = Math.min(CONFIG.STAMPS_FOR_REWARD, state.stamps + 1);
    if (state.stamps >= CONFIG.STAMPS_FOR_REWARD) {
      state.stamps = 0; state.freeBurrito = true;
      persist('tortilla_free_burrito', true);
      showConfetti();
      toast('🎉 You earned a FREE Burrito!');
    }
    persist('tortilla_stamps', state.stamps);
  }

  function addPoints(amount) {
    const pts = Math.floor(Math.max(0, amount) * CONFIG.POINTS_PER_POUND);
    if (pts <= 0) return;
    state.points += pts;
    if (state.points >= 150) state.level = 'hot';
    else if (state.points >= 50) state.level = 'medium';
    else state.level = 'mild';
    persist('tortilla_points', state.points);
    persist('tortilla_level', state.level);
    toast(`+${pts} points earned! 🌟`);
  }

  function awardAchievement(key) {
    if (!(key in ACHIEVEMENTS) || state.achievements.includes(key)) return;
    state.achievements.push(key);
    persist('tortilla_achievements', state.achievements);
    toast(`🏆 Achievement unlocked: ${ACHIEVEMENTS[key].name}!`);
    showConfetti();
  }

  function checkAchievements() {
    if (state.stats.totalOrders >= 1) awardAchievement('first_order');
    if (isNightTime()) awardAchievement('night_owl');
    if (state.stats.totalOrders >= 10) awardAchievement('loyal_customer');
    if (state.stats.guacOrdered >= 10) awardAchievement('guac_master');
    if (state.stats.veggieOrdered >= 5) awardAchievement('healthy_choice');
    const spicyIds = MENU_ITEMS.filter(i => i.spice).map(i => i.id);
    if (spicyIds.length && spicyIds.every(id => state.stats.spicyItems.includes(id))) awardAchievement('spice_king');
    if (state.secretUnlocked) awardAchievement('secret_finder');
  }

  function updateStatsFromOrder(order) {
    state.stats.totalOrders += 1;
    order.items.forEach(it => {
      const menuItem = MENU_ITEMS.find(m => m.name === it.name);
      if (menuItem) {
        if (it.details && it.details.includes('Guacamole')) state.stats.guacOrdered += it.qty;
        if (menuItem.tags.includes('veggie')) state.stats.veggieOrdered += it.qty;
        if (menuItem.spice && !state.stats.spicyItems.includes(menuItem.id)) state.stats.spicyItems.push(menuItem.id);
      }
    });
    persist('tortilla_stats', state.stats);
    if (!state.secretUnlocked && state.stats.totalOrders >= CONFIG.SECRET_ORDERS_NEEDED) {
      state.secretUnlocked = true;
      persist('tortilla_secret_unlocked', true);
      toast('🤫 Secret Menu unlocked!');
    }
  }

  /* ============================================================
     SECTION 15 · CHECKOUT & ORDERS
     ============================================================ */
  let checkingOut = false;

  function computeOrderStatus(order) {
    if (!order.startedAt) return order.status ?? 3;
    if (order.status === 3) return 3;
    const elapsed = Date.now() - order.startedAt;
    return Math.min(3, Math.floor(elapsed / CONFIG.STATUS_STEP_MS));
  }

  function refreshLiveOrderStatuses() {
    let changed = false;
    state.orders.forEach(o => {
      if (o.status < 3) {
        const computed = computeOrderStatus(o);
        if (computed !== o.status) { o.status = computed; changed = true; }
      }
    });
    if (changed) persist('tortilla_v2_orders', state.orders);
    return changed;
  }

  function checkout() {
    if (checkingOut) return;
    if (!state.cart.length) return;

    const v = validateForm();
    const err = document.getElementById('ferr');
    if (!v.ok) {
      if (err) err.textContent = v.msg;
      const field = document.getElementById(v.field);
      if (field) field.focus();
      return;
    }
    if (err) err.textContent = '';
    persist('tortilla_v2_customer', state.customer);
    updateGreeting();

    checkingOut = true;
    const btn = document.querySelector('[data-action="checkout"]');
    if (btn) { btn.disabled = true; btn.textContent = 'Placing order…'; }

    try {
      const subtotal = cartTotal();
      const delivery = deliveryFee(subtotal);
      const flat = Math.min(flatVoucherDiscount(), subtotal);
      const guac = Math.min(guacVoucherDiscount(), Math.max(0, subtotal - flat));
      const total = Math.max(0, subtotal + delivery - flat - guac);

      const items = state.cart.map(l => ({
        name: ITEM[l.id].name,
        qty: l.qty,
        price: unitPrice(l),
        details: [lineOptions(l), l.note ? `Note: ${l.note}` : ''].filter(Boolean).join(' · '),
        special: l.special || null
      }));

      let orderId;
      do { orderId = Math.floor(100000 + Math.random() * 900000); }
      while (state.orders.some(o => o.id === orderId));

      const order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        startedAt: Date.now(),
        items, total,
        payment: 'Cash on delivery',
        name: state.customer.name,
        phone: state.customer.phone,
        address: {
          area: state.customer.area, street: state.customer.street,
          building: state.customer.building, floor: state.customer.floor, apt: state.customer.apt
        },
        coupon: state.coupon ? state.coupon.code : null,
        vouchers: activeVouchers().map(v => ({ ...v, used: true })),
        status: 0
      };

      state.orders.unshift(order);
      persist('tortilla_v2_orders', state.orders);
      state.vouchers = state.vouchers.map(v => ({ ...v, used: true }));

      state.cart = [];
      state.coupon = null; state.couponInput = ''; state.couponMsg = '';
      persist('tortilla_coupon', null);
      commitCart();
      persist('tortilla_vouchers', state.vouchers);

      addStamp();
      addPoints(subtotal);
      updateStatsFromOrder(order);
      checkAchievements();

      showConfetti();
      toast('Order placed 🎉');
      setTimeout(() => { location.hash = '#/orders'; }, 800);
      startOrderTracking();
    } catch (e) {
      console.warn('Checkout error:', e);
      if (err) err.textContent = 'Something went wrong. Please try again.';
    } finally {
      checkingOut = false;
      if (btn) btn.disabled = false;
    }
  }

  let trackingTimer = null;
  function startOrderTracking() {
    if (trackingTimer) return;
    trackingTimer = setInterval(() => {
      const changed = refreshLiveOrderStatuses();
      if (changed && currentRoute() === 'orders') refresh();
      if (!state.orders.some(o => o.status < 3)) { clearInterval(trackingTimer); trackingTimer = null; }
    }, CONFIG.STATUS_STEP_MS);
  }

  function reorder(orderId) {
    const order = state.orders.find(o => String(o.id) === String(orderId));
    if (!order) return;
    order.items.forEach(item => {
      const menuItem = MENU_ITEMS.find(m => m.name === item.name);
      if (!menuItem) return;
      const special = item.special && sanitizeSpecial(item.special);
      mergeToCart({
        id: menuItem.id, size: menuItem.sizes[0].key, spice: null,
        addons: [], note: '', qty: Math.max(1, Math.min(CONFIG.MAX_QTY, Number(item.qty) || 1)),
        special: special || null
      });
    });
    toast('Items added to cart! ⚡');
    location.hash = '#/cart';
  }

  function saveName() {
    const input = document.getElementById('pName');
    const name = (input ? input.value : '').trim().slice(0, 40);
    if (name.length < 2) { toast('Please enter a valid name'); return; }
    state.customer.name = name;
    persist('tortilla_v2_customer', state.customer);
    toast(`Nice to meet you, ${name} 👋`);
    refresh();
  }

  /* ============================================================
     SECTION 16 · GAMIFICATION
     ============================================================ */
  function addVoucher(v) {
    state.vouchers.push({ ...v, id: uid(), used: false });
    persist('tortilla_vouchers', state.vouchers);
    refresh();
  }

  function spinWheel() {
    if (state.lastSpin === today()) { toast('You already spun today! Come back tomorrow 🌅'); return; }
    const wheel = document.getElementById('wheel');
    if (!wheel) return;

    const random = Math.random() * 100;
    let cumulative = 0, prize = WHEEL_PRIZES[WHEEL_PRIZES.length - 1];
    for (const p of WHEEL_PRIZES) { cumulative += p.probability; if (random < cumulative) { prize = p; break; } }

    wheel.style.transform = `rotate(${1440 + Math.random() * 360}deg)`;

    setTimeout(() => {
      if (prize.type === 'percent') { addVoucher({ type: 'percent', pct: prize.pct }); toast(`🎉 You won ${prize.name}!`); }
      else if (prize.type === 'delivery') { addVoucher({ type: 'delivery' }); toast('🎉 Free delivery voucher added!'); }
      else if (prize.type === 'guac') { addVoucher({ type: 'guac' }); toast('🎉 Free guacamole voucher added!'); }
      else if (prize.type === 'flat') { addVoucher({ type: 'flat', amount: prize.amount }); toast(`🎉 ${money(prize.amount)} voucher added!`); }
      else toast('Better luck next time! Try again tomorrow');
      showConfetti();
      state.lastSpin = today();
      persist('tortilla_last_spin', state.lastSpin);
      refresh();
    }, 3000);
  }

  function scratchCard() {
    if (state.lastScratch === today()) return;
    const cover = document.getElementById('scratchCover');
    const prizeEl = document.getElementById('scratchPrize');
    if (!cover || !prizeEl || cover.classList.contains('hidden')) return;

    const prize = SCRATCH_PRIZES[Math.floor(Math.random() * SCRATCH_PRIZES.length)];
    cover.classList.add('hidden');
    prizeEl.textContent = `${prize.emoji} ${prize.name}`;

    if (prize.type === 'percent') addVoucher({ type: 'percent', pct: prize.pct });
    else if (prize.type === 'delivery') addVoucher({ type: 'delivery' });
    else if (prize.type === 'guac') addVoucher({ type: 'guac' });
    else if (prize.type === 'flat') addVoucher({ type: 'flat', amount: prize.amount });

    toast(`🎉 You scratched: ${prize.name}!`);
    state.lastScratch = today();
    persist('tortilla_last_scratch', state.lastScratch);
    showConfetti();
  }

  function addMysteryBurrito() {
    const burritos = MENU_ITEMS.filter(i => i.cat === 'Burritos' && !isSecret(i));
    if (!burritos.length) return;
    const pick = burritos[Math.floor(Math.random() * burritos.length)];
    mergeToCart({
      id: pick.id, size: pick.sizes[0].key, spice: null,
      addons: [], note: '', qty: 1, special: { type: 'fixed', price: 6.00 }
    });
    bumpCartIcon();
    toast(`🎁 Mystery ${pick.name} added for ${money(6)}!`);
  }

  function addChefSpecial() {
    if (!state.chefSpecial) return;
    const item = ITEM[state.chefSpecial.id];
    if (!item) return;
    mergeToCart({
      id: item.id, size: item.sizes[0].key, spice: null,
      addons: [], note: '', qty: 1,
      special: { type: 'percent', pct: state.chefSpecial.discount }
    });
    bumpCartIcon();
    toast(`👨‍🍳 ${item.name} added (${Math.round(state.chefSpecial.discount * 100)}% off)`);
  }

  function addCombo(index) {
    const combo = COMBOS[index];
    if (!combo) return;
    combo.items.forEach(id => {
      const it = ITEM[id];
      if (!it) return;
      mergeToCart({
        id: it.id, size: it.sizes[0].key, spice: it.spice ? 'Medium' : null,
        addons: [], note: '', qty: 1, special: null
      });
    });
    bumpCartIcon();
    toast(`✨ ${combo.label} added!`);
  }

  function redeemPoints() {
    if (state.points < CONFIG.POINTS_FOR_DISCOUNT) { toast('Not enough points!'); return; }
    if (cartTotal() <= 0) { toast('Add items to your cart first'); return; }
    state.points -= CONFIG.POINTS_FOR_DISCOUNT;
    persist('tortilla_points', state.points);
    addVoucher({ type: 'flat', amount: CONFIG.DISCOUNT_VALUE });
    toast(`🎉 ${money(CONFIG.DISCOUNT_VALUE)} voucher added!`);
    refresh();
  }

  function claimFreeBurrito() {
    if (!state.freeBurrito) return;
    const burritos = MENU_ITEMS.filter(i => i.cat === 'Burritos' && !isSecret(i));
    if (!burritos.length) return;
    const cheapest = burritos.reduce((min, it) => fromPrice(it) < fromPrice(min) ? it : min, burritos[0]);
    mergeToCart({
      id: cheapest.id, size: cheapest.sizes[0].key, spice: null,
      addons: [], note: '', qty: 1, special: { type: 'free' }
    });
    state.freeBurrito = false;
    persist('tortilla_free_burrito', false);
    showConfetti();
    toast('🎉 Free Burrito added to cart!');
    location.hash = '#/cart';
  }

  function unlockSecret() {
    const input = document.getElementById('secretCode');
    const code = (input ? input.value : '').trim().toUpperCase();
    if (code === CONFIG.SECRET_CODE) {
      state.secretUnlocked = true;
      persist('tortilla_secret_unlocked', true);
      checkAchievements();
      showConfetti();
      toast('🤫 Secret Menu unlocked!');
      refresh();
    } else if (code.length > 0) toast('Wrong code. Try again!');
  }

  /* ============================================================
     SECTION 17 · BIRTHDAY, WEATHER, LIVE COUNTS
     ============================================================ */
  function maybeApplyBirthdayCoupon() {
    const bday = state.customer.birthday;
    if (!isBirthday(bday)) return;
    if (state.birthdayApplied === today()) return;
    if (state.coupon && state.coupon.code === 'BIRTHDAY50') return;
    state.coupon = { code: 'BIRTHDAY50', pct: COUPONS.BIRTHDAY50 };
    state.couponInput = 'BIRTHDAY50';
    persist('tortilla_coupon', { code: 'BIRTHDAY50' });
    state.birthdayApplied = today();
    persist('tortilla_birthday_applied', state.birthdayApplied);
    setTimeout(() => toast('🎂 Happy Birthday! 50% off applied'), 500);
  }

  async function fetchWeather() {
    if (!CONFIG.WEATHER_API_KEY || CONFIG.WEATHER_API_KEY === 'your-openweathermap-key') return;
    try {
      const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(CONFIG.WEATHER_CITY)}&appid=${encodeURIComponent(CONFIG.WEATHER_API_KEY)}`);
      if (!r.ok) return;
      const data = await r.json();
      if (data && data.main) {
        state.weather = data;
        persist('tortilla_weather', data);
        if (currentRoute() === 'home') refresh();
      }
    } catch (e) { console.warn('Weather fetch failed:', e); }
  }

  function updateLiveCounts() {
    MENU_ITEMS.forEach(item => {
      const cur = Number(state.liveCounts[item.id]) || 0;
      state.liveCounts[item.id] = Math.max(0, cur + Math.floor(Math.random() * 3) - 1);
    });
    persist('tortilla_live_counts', state.liveCounts);
  }

  /* ============================================================
     SECTION 18 · EVENTS
     ============================================================ */
  document.addEventListener('click', e => {
    const catLink = e.target.closest('a[data-cat]');
    if (catLink) { state.filter = catLink.dataset.cat; state.subcat = 'All'; return; }

    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'open': openItem(el.dataset.id); break;
      case 'quick': {
        e.stopPropagation();
        const it = ITEM[el.dataset.id];
        if (!it) return;
        if (isSecret(it) && !state.secretUnlocked) return;
        mergeToCart({
          id: it.id, size: it.sizes[0].key, spice: it.spice ? 'Medium' : null,
          addons: [], note: '', qty: 1, special: null
        });
        bumpCartIcon();
        toast(`1× ${it.name} added`);
        el.classList.add('done'); el.textContent = '✓';
        setTimeout(() => { el.classList.remove('done'); el.textContent = '+'; }, 900);
        break;
      }
      case 'filter': { state.filter = el.dataset.val; state.subcat = 'All'; refresh(); break; }
      case 'subfilter': { state.subcat = el.dataset.val; refresh(); break; }
      case 'qty': changeLineQty(el.dataset.uid, Number(el.dataset.d)); break;
      case 'mqty': {
        if (!state.draft) return;
        const n = state.draft.qty + Number(el.dataset.d);
        if (n >= 1 && n <= CONFIG.MAX_QTY) { state.draft.qty = n; updateModalTotals(); }
        break;
      }
      case 'madd': commitDraft(); closeModal(); break;
      case 'close-modal': closeModal(); break;
      case 'apply-coupon': applyCoupon(); break;
      case 'checkout': checkout(); break;
      case 'save-name': saveName(); break;
      case 'toast': toast(el.dataset.msg); break;
      case 'go': location.hash = el.dataset.to; break;
      case 'address': toast('Address selector coming soon'); break;
      case 'reorder': reorder(el.dataset.orderId); break;
      case 'spin-wheel': spinWheel(); break;
      case 'scratch': scratchCard(); break;
      case 'add-mystery': addMysteryBurrito(); break;
      case 'add-special': addChefSpecial(); break;
      case 'add-combo': addCombo(Number(el.dataset.index)); break;
      case 'redeem-points': redeemPoints(); break;
      case 'claim-free': claimFreeBurrito(); break;
      case 'unlock-secret': unlockSecret(); break;
      case 'toggle-review': {
        const form = document.getElementById('reviewForm');
        if (form) form.hidden = !form.hidden;
        break;
      }
      case 'cancel-review': {
        const form = document.getElementById('reviewForm');
        if (form) form.hidden = true;
        break;
      }
      case 'pick-star': {
        state.reviewStars = Number(el.dataset.star);
        updateStarPicker();
        break;
      }
      case 'submit-review': {
        if (state.draft) submitReview(state.draft.id);
        break;
      }
      case 'rate-order': {
        const order = state.orders.find(o => String(o.id) === String(el.dataset.orderId));
        if (!order) return;
        // Rate first item (or open the item modal for the first item)
        const first = order.items[0];
        if (first) {
          const m = MENU_ITEMS.find(x => x.name === first.name);
          if (m) { openItem(m.id); toast('Leave a review for this item ⭐'); }
        }
        break;
      }
    }
  });

  modal.addEventListener('change', e => {
    const d = state.draft, t = e.target;
    if (!d) return;
    if (t.name === 'size') d.size = t.value;
    else if (t.name === 'spice') d.spice = t.value;
    else if (t.name === 'addon') {
      d.addons = t.checked ? [...new Set([...d.addons, t.value])] : d.addons.filter(x => x !== t.value);
    } else return;
    renderModal();
  });

  modal.addEventListener('input', e => {
    if (e.target.id === 'noteInput' && state.draft) state.draft.note = e.target.value.slice(0, 80);
  });

  app.addEventListener('input', e => {
    if (e.target.id !== 'search') return;
    state.query = e.target.value;
    const grid = document.querySelector('[data-grid]');
    if (!grid) return;
    const list = filteredItems();
    grid.innerHTML = list.length ? list.map(card).join('') : '<p class="empty-search">No dishes match your search.</p>';
  });

  app.addEventListener('keydown', e => {
    if (e.key === 'Enter' && (e.target.matches('[data-action="unlock-secret"]') || e.target.id === 'secretCode')) {
      e.preventDefault(); unlockSecret();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('show')) { closeModal(); return; }
    if (e.key === 'Enter' && e.target.matches('[data-action="open"]')) { e.preventDefault(); e.target.click(); return; }
    if (e.key === 'Tab' && modal.classList.contains('show')) {
      const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const list = Array.from(focusables).filter(el => !el.disabled && el.offsetParent !== null && !el.hidden);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener('error', e => {
    if (e.target.tagName === 'IMG' && e.target.hasAttribute('data-fallback')) e.target.remove();
  }, true);

  window.addEventListener('hashchange', render);

  /* ============================================================
     SECTION 19 · INIT
     ============================================================ */
  if (!location.hash) location.hash = '#/home';
  if (!state.secretUnlocked && state.stats.totalOrders >= CONFIG.SECRET_ORDERS_NEEDED) {
    state.secretUnlocked = true;
    persist('tortilla_secret_unlocked', true);
  }
  refreshLiveOrderStatuses();
  if (state.orders.some(o => o.status < 3)) startOrderTracking();
  maybeApplyBirthdayCoupon();
  fetchWeather();
  updateLiveCounts();
  setInterval(updateLiveCounts, 30000);
  render();
})();
</script>
</body>
</html>