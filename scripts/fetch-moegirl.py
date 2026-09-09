import urllib.request, urllib.parse, json, os, re

UA = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36'}
API = 'https://commons.moegirl.tw/api.php'

def api(params):
    q = urllib.parse.urlencode(params)
    req = urllib.request.Request(API + '?' + q, headers=UA)
    return json.loads(urllib.request.urlopen(req, timeout=20).read().decode('utf-8'))

def search_files(keyword, limit=20):
    d = api({'action': 'query', 'list': 'search', 'srsearch': keyword, 'srnamespace': '6', 'srlimit': limit, 'format': 'json'})
    return [r['title'] for r in d.get('query', {}).get('search', [])]

def file_url(title):
    d = api({'action': 'query', 'titles': title, 'prop': 'imageinfo', 'iiprop': 'url', 'format': 'json'})
    for p in d['query']['pages'].values():
        if 'imageinfo' in p:
            return p['imageinfo'][0]['url']
    return None

kws = ['原神 壁纸', '崩坏星穹铁道 壁纸', '鸣潮 壁纸', '明日方舟 壁纸', '无期迷途 壁纸', '绝区零 壁纸', '战双帕弥什 壁纸']
found = []
for k in kws:
    try:
        titles = search_files(k, 12)
        for t in titles:
            u = file_url(t)
            if u and re.search(r'\.(jpg|jpeg|png)(\?|$)', u, re.I):
                found.append(u)
        print(k, len(titles), 'hits')
    except Exception as e:
        print(k, 'err', repr(e))

found = list(dict.fromkeys(found))
print('total urls', len(found))
open('D:/游戏日报/作品集/scripts/imgurls.txt', 'w', encoding='utf-8').write('\n'.join(found))
