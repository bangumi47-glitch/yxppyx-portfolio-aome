import urllib.request, urllib.parse, re

def fetch_bing(q, n=15):
    url = 'https://cn.bing.com/images/search?q=' + urllib.parse.quote(q) + '&count=35'
    req = urllib.request.Request(url, headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
        'Accept-Language': 'zh-CN,zh;q=0.9'
    })
    html = urllib.request.urlopen(req, timeout=20).read().decode('utf-8', errors='ignore')
    murls = re.findall(r'murl":"(https?://[^"]+)"', html)
    out = []
    for m in murls:
        m = m.replace('\\u002f', '/').replace('\\/', '/')
        if re.search(r'\.(jpg|jpeg|png)(\?|$)', m, re.I):
            out.append(m)
    return list(dict.fromkeys(out))

kws = ['原神 官方壁纸', '崩坏星穹铁道 壁纸', '鸣潮 壁纸', '明日方舟 壁纸', '无期迷途 壁纸', '绝区零 壁纸']
all_imgs = []
for k in kws:
    try:
        imgs = fetch_bing(k)
        print(k, len(imgs), 'zhang')
        all_imgs += imgs
    except Exception as e:
        print(k, 'err', repr(e))

all_imgs = list(dict.fromkeys(all_imgs))
print('total', len(all_imgs))
open('D:/游戏日报/作品集/scripts/imgurls.txt', 'w', encoding='utf-8').write('\n'.join(all_imgs))
