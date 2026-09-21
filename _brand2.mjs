import sharp from 'sharp';
const RAW='C:/Users/DELL/AppData/Local/Temp/claude/d--Cardiology/1f13d435-22ef-48ec-8f12-d2ae01272cc1/scratchpad/raw';
const OUT='D:/Cardiology/public/images/branding';
const INK=[19,38,58], PAPER=[255,255,255];

async function recolor(src, textColor){
  const base = sharp(src).ensureAlpha();
  const { data, info } = await base.raw().toBuffer({resolveWithObject:true});
  const out = Buffer.from(data);
  for(let i=0;i<out.length;i+=4){
    if(out[i+3]<20) continue;
    const r=out[i],g=out[i+1],b=out[i+2];
    if(r>70 && r>g+45 && r>b+45) continue;
    out[i]=textColor[0]; out[i+1]=textColor[1]; out[i+2]=textColor[2];
  }
  return sharp(out,{raw:{width:info.width,height:info.height,channels:4}});
}

for (const [name,color] of [['advanced-cardiology-logo',INK],['advanced-cardiology-logo-light',PAPER]]){
  const img = await recolor(`${RAW}/logo.png`, color);
  const trimmed = await img.trim({threshold:2}).png().toBuffer();
  const m = await sharp(trimmed).metadata();
  const r = await sharp(trimmed).resize({width:m.width*2,kernel:'lanczos3'}).png({compressionLevel:9}).toFile(`${OUT}/${name}.png`);
  console.log(name.padEnd(36), `${r.width}x${r.height}`, `${(r.size/1024).toFixed(1)}KB`);
}

// Heart-mark favicon: crop the heart glyph out of the original artwork
const heart = await recolor(`${RAW}/logo.png`, INK);
const hb = await heart.extract({left:0,top:30,width:150,height:160}).trim({threshold:2}).png().toBuffer();
for (const size of [512,192,180,32]){
  const pad = Math.round(size*0.14);
  await sharp({create:{width:size,height:size,channels:4,background:{r:255,g:255,b:255,alpha:0}}})
    .composite([{input: await sharp(hb).resize({width:size-pad*2,height:size-pad*2,fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).toBuffer(), gravity:'center'}])
    .png({compressionLevel:9}).toFile(`${OUT}/heart-mark-${size}.png`);
}
console.log('favicons written');
