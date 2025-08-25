<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #f0f8ff; margin: 0; overflow: hidden; }
    .bubble {
      position: absolute;
      border-radius: 50%;
      background: rgba(100,200,255,0.7);
      text-align: center;
      line-height: 100px;
      font-family: sans-serif;
      cursor: pointer;
      animation: float 6s ease-in-out infinite;
    }
    @keyframes float {
      0%   { transform: translateY(0px); }
      50%  { transform: translateY(-30px); }
      100% { transform: translateY(0px); }
    }
  </style>
</head>
<body>
  <div class="bubble" style="width:100px;height:100px;left:100px;top:200px;">Kompost</div>
  <div class="bubble" style="width:120px;height:120px;left:250px;top:300px;">Brunnen</div>
  <div class="bubble" style="width:90px;height:90px;left:400px;top:150px;">Hochbeet</div>

  <script>
    document.querySelectorAll('.bubble').forEach(bubble => {
      bubble.addEventListener('click', function() {
        this.style.transition = "all 0.3s ease-out";
        this.style.transform = "scale(0)";
        setTimeout(() => this.remove(), 300);
      });
    });
  </script>
</body>
</html>
