import urllib.request, re, os, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36'}

# 多个 TapTap 壁纸 moment 页（无期迷途等二游的影像壁纸）
PAGES = [
    'https://www.taptap.cn/moment/771113393682648098',
    'https://www.taptap.cn/moment/646723005036103883',
    'https://www.taptap.cn/moment/805395911239798737',
]

def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    return urllib.request.urlopen(req, timeout=25, context=ctx).read().decode('utf-8', errors='ignore')

imgs = []
for url in PAGES:
    try:
        html = fetch(url)
        found = re.findall(r'https://img\d?-tc\.tapimg\.com/moment/etag/[^"\\ ]+?\.jpg', html)
        # 去掉缩略图后缀，取原图
        for f in found:
            base = f.split('/_tap_')[0]
            imgs.append(base)
    except Exception as e:
        print('err', url, repr(e))

imgs = list(dict.fromkeys(imgs))
print('去重后图片数:', len(imgs))

outdir = 'D:/游戏日报/作品集/public/hero-bg'
# 从 8.jpg 开始编号（1-7 是用户提供的）
start = 8
ok = 0
for i, u in enumerate(imgs):
    try:
        req = urllib.request.Request(u, headers=UA)
        data = urllib.request.urlopen(req, timeout=30, context=ctx).read()
        if len(data) < 3000:
            continue
        path = os.path.join(outdir, f'{start + i}.jpg')
        open(path, 'wb').write(data)
        ok += 1
        print(start + i, len(data)//1024, 'KB')
    except Exception as e:
        print('dl err', u[:60], repr(e))

print('下载完成', ok, '张')
