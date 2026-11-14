"""
Vẽ ảnh đại diện hoạt hình tạm cho thành viên (SVG, nền trời xanh giống ảnh mẫu).

Đây là hình minh họa chung cho cả 6 người (cùng kích thước đầu, cùng nền), KHÔNG vẽ theo ngoại hình thật của ai. Khi thành viên có ảnh riêng,
chỉ cần chép đè public/team/<slug>.webp.

Chạy:  python scripts/make-team-avatars.py <thư mục xuất SVG>
"""
import os
import sys

SKIN = "#F6CDB0"
SKIN_SHADE = "#E8B596"
LINE = "#5B3A33"


def background():
    return """
  <rect width="400" height="400" fill="#BFE4F6"/>
  <g fill="#FFFFFF" opacity=".9">
    <ellipse cx="70" cy="80" rx="46" ry="16"/><ellipse cx="100" cy="68" rx="30" ry="16"/>
    <ellipse cx="330" cy="120" rx="50" ry="16"/><ellipse cx="305" cy="108" rx="28" ry="15"/>
  </g>
  <g fill="#A5D2EC">
    <rect x="18" y="250" width="46" height="150"/><rect x="70" y="290" width="34" height="110"/>
    <rect x="300" y="270" width="40" height="130"/><rect x="346" y="230" width="42" height="170"/>
  </g>"""


def face(glasses=False, earrings=None):
    g = f"""
  <rect x="178" y="262" width="44" height="60" rx="18" fill="{SKIN_SHADE}"/>
  <circle cx="122" cy="212" r="13" fill="{SKIN}"/><circle cx="278" cy="212" r="13" fill="{SKIN}"/>
  <ellipse cx="200" cy="200" rx="78" ry="88" fill="{SKIN}"/>
  <ellipse cx="170" cy="212" rx="7" ry="9" fill="{LINE}"/><ellipse cx="230" cy="212" rx="7" ry="9" fill="{LINE}"/>
  <circle cx="172.5" cy="208.5" r="2.5" fill="#fff"/><circle cx="232.5" cy="208.5" r="2.5" fill="#fff"/>
  <path d="M156 192 Q170 184 184 191" stroke="{LINE}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M216 191 Q230 184 244 192" stroke="{LINE}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M197 228 Q200 234 204 228" stroke="{SKIN_SHADE}" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M182 248 Q200 264 218 248" stroke="#C2545B" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="150" cy="238" r="13" fill="#F4A6A0" opacity=".55"/><circle cx="250" cy="238" r="13" fill="#F4A6A0" opacity=".55"/>"""
    if glasses:
        g += f"""
  <g stroke="{LINE}" stroke-width="3.5" fill="#FFFFFF" fill-opacity=".25">
    <circle cx="170" cy="212" r="21"/><circle cx="230" cy="212" r="21"/>
  </g>
  <path d="M191 210 Q200 204 209 210" stroke="{LINE}" stroke-width="3.5" fill="none"/>"""
    if earrings:
        g += f"""
  <circle cx="121" cy="230" r="5" fill="{earrings}"/><circle cx="279" cy="230" r="5" fill="{earrings}"/>"""
    return g


def body(color, collar=None):
    g = f"""
  <path d="M60 400 C62 340 120 312 178 306 L222 306 C280 312 338 340 340 400 Z" fill="{color}"/>"""
    if collar:
        g += f"""
  <path d="M170 306 L200 340 L230 306 L216 302 L200 322 L184 302 Z" fill="{collar}"/>"""
    return g


# Mỗi kiểu tóc gồm phần sau (vẽ trước khuôn mặt) và phần trước (mái, vẽ sau khuôn mặt).
def hair_long(c):
    back = f'<path d="M112 210 C104 46 296 46 288 210 L296 372 C260 388 140 388 104 372 Z" fill="{c}"/>'
    front = f'<path d="M118 214 C108 56 292 56 282 214 C276 170 250 142 226 138 C196 172 146 170 118 214 Z" fill="{c}"/>'
    return back, front


def hair_bob(c):
    back = f'<path d="M108 215 C100 48 300 48 292 215 L290 286 C270 300 130 300 110 286 Z" fill="{c}"/>'
    front = f'<path d="M116 216 C108 56 292 56 284 216 L276 176 C240 166 160 166 124 176 Z" fill="{c}"/>'
    return back, front


def hair_short(c):
    """Tóc ngắn ngang cằm, mái chéo."""
    back = f'<path d="M110 214 C100 48 300 48 290 214 L286 262 C262 276 138 276 114 262 Z" fill="{c}"/>'
    front = f'<path d="M118 214 C108 56 292 56 282 214 C276 170 250 142 226 138 C196 172 146 170 118 214 Z" fill="{c}"/>'
    return back, front


CURTAIN = (
    "M118 216 C108 56 292 56 282 216 C279 192 264 174 246 165 C222 153 206 136 200 114 "
    "C194 136 178 153 154 165 C136 174 121 192 118 216 Z"
)


def curtain_bangs(c):
    """Mái bay: rẽ ngôi giữa, hai bên vén cong ra ngoài, đuôi mái hơi hất."""
    tips = (
        f'<path d="M119 204 Q104 224 110 246 Q124 230 130 208 Z" fill="{c}"/>'
        f'<path d="M281 204 Q296 224 290 246 Q276 230 270 208 Z" fill="{c}"/>'
    )
    return f'<path d="{CURTAIN}" fill="{c}"/>' + tips


def hair_long_curtain(c):
    """Tóc dài thả, mái bay."""
    back = f'<path d="M110 210 C100 46 300 46 290 210 L300 376 C262 392 138 392 100 376 Z" fill="{c}"/>'
    return back, curtain_bangs(c)


def hair_ponytail(c):
    """Tóc buộc đuôi ngựa cao, mái bay."""
    tail = (
        f'<path d="M236 84 C282 44 336 78 330 146 C326 196 306 232 312 276 '
        f'C284 256 276 206 284 160 C288 128 270 108 244 112 Z" fill="{c}"/>'
    )
    back = tail + f'<path d="M114 220 C104 52 296 52 286 220 L282 248 C250 232 150 232 118 248 Z" fill="{c}"/>'
    return back, curtain_bangs(c)


def hair_bun(c):
    back = f'<circle cx="200" cy="88" r="40" fill="{c}"/><path d="M114 220 C104 52 296 52 286 220 L282 250 C250 232 150 232 118 250 Z" fill="{c}"/>'
    front = f'<path d="M118 212 C110 58 290 58 282 212 C270 164 236 142 200 150 C164 142 130 164 118 212 Z" fill="{c}"/>'
    return back, front


def hair_wavy(c):
    back = (
        f'<path d="M110 206 C100 44 300 44 290 206 C312 236 286 262 304 292 C318 320 292 344 300 372 '
        f'C260 390 140 390 100 372 C108 344 82 320 96 292 C114 262 88 236 110 206 Z" fill="{c}"/>'
    )
    front = f'<path d="M118 216 C108 56 292 56 282 216 C272 168 236 146 200 126 C164 146 128 168 118 216 Z" fill="{c}"/>'
    return back, front


def hair_pigtails(c, tie):
    back = (
        f'<path d="M114 214 C104 50 296 50 286 214 L280 244 C250 228 150 228 120 244 Z" fill="{c}"/>'
        f'<path d="M112 236 C76 250 70 318 96 352 C120 344 132 290 128 244 Z" fill="{c}"/>'
        f'<path d="M288 236 C324 250 330 318 304 352 C280 344 268 290 272 244 Z" fill="{c}"/>'
        f'<circle cx="118" cy="242" r="9" fill="{tie}"/><circle cx="282" cy="242" r="9" fill="{tie}"/>'
    )
    front = f'<path d="M118 214 C110 56 290 56 282 214 L274 180 C250 150 216 172 200 168 C184 172 150 150 126 180 Z" fill="{c}"/>'
    return back, front


def avatar(hair, top, collar=None, glasses=False, earrings=None, extra=""):
    back, front = hair
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">'
        + background()
        + "\n  "
        + back
        + body(top, collar)
        + face(glasses, earrings)
        + "\n  "
        + front
        + extra
        + "\n</svg>\n"
    )


BACKPACK_AND_CUP = (
    '\n  <path d="M146 314 L128 400 L158 400 L170 308 Z" fill="#7D8590"/>'
    '<path d="M254 314 L272 400 L242 400 L230 308 Z" fill="#7D8590"/>'
    '\n  <path d="M92 338 L132 338 L127 400 L97 400 Z" fill="#F4EDE4"/>'
    '<rect x="88" y="328" width="48" height="12" rx="5" fill="#5B3A33"/>'
    '<path d="M94 358 L130 358 L128 384 L96 384 Z" fill="#B98A5E"/>'
)

HEADBAND = '\n  <path d="M124 168 C150 124 250 124 276 168 L270 178 C246 140 154 140 130 178 Z" fill="#F0BF49"/>'

AVATARS = {
    "nhat-ha": avatar(hair_short("#2B1B17"), "#970A1D", collar="#FFFFFF", glasses=True, earrings="#F0BF49"),
    "kieu-trang": avatar(hair_wavy("#4A2C22"), "#F7F1EC", collar="#E999A7"),
    "uyen-phuong": avatar(hair_ponytail("#5A3524"), "#2A2A2E", extra=BACKPACK_AND_CUP),
    "thuc-nhi": avatar(hair_long_curtain("#1F1A1C"), "#5FB894", glasses=True),
    "xuan-tiep": avatar(hair_bun("#3A241D"), "#F0BF49", collar="#FFFFFF"),
    "van-nhu": avatar(hair_pigtails("#2B1B17", "#E999A7"), "#E999A7", extra=HEADBAND),
}

if __name__ == "__main__":
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for slug, svg in AVATARS.items():
        with open(os.path.join(out, f"{slug}.svg"), "w", encoding="utf-8", newline="\n") as f:
            f.write(svg)
    print(len(AVATARS), "SVG ->", out)
