// 导航栏响应式菜单
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // 关闭移动菜单
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    }
  });
});

// 滚动到顶部按钮
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 3D背景效果
function initThreeBackground() {
  const canvas = document.getElementById('bg-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  const renderer = new THREE.WebGLRenderer({ 
    canvas: canvas, 
    alpha: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // 创建粒子
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 1500;
  
  const posArray = new Float32Array(particlesCount * 3);
  
  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);
  
  // 创建线条
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.2
  });
  
  const lineGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(100 * 3);
  
  for (let i = 0; i < 100 * 3; i++) {
    linePositions[i] = (Math.random() - 0.5) * 10;
  }
  
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  
  const lineMesh = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(lineMesh);
  
  camera.position.z = 5;
  
  // 动画
  function animate() {
    requestAnimationFrame(animate);
    
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += 0.0005;
    
    lineMesh.rotation.x += 0.0003;
    lineMesh.rotation.y += 0.0003;
    
    renderer.render(scene, camera);
  }
  
  animate();
  
  // 响应窗口大小变化
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
  // 初始化3D背景
  if (typeof THREE !== 'undefined') {
    initThreeBackground();
  }
  
  // 为每个部分添加滚动动画
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// 鼠标移动效果
window.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('body');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  // 背景网格随鼠标移动
  document.body.style.setProperty('--mouse-x', x);
  document.body.style.setProperty('--mouse-y', y);
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY > 100) {
    nav.style.background = 'rgba(10, 10, 10, 0.95)';
    nav.style.boxShadow = '0 4px 20px rgba(0, 212, 255, 0.1)';
  } else {
    nav.style.background = 'rgba(10, 10, 10, 0.8)';
    nav.style.boxShadow = 'none';
  }
});

// 技术卡片悬停效果
const skillCards = document.querySelectorAll('.skill__card');

skillCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// 相册图片悬停效果
const galleryItems = document.querySelectorAll('.gallery__item');

galleryItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const img = item.querySelector('img');
    img.style.transform = 'scale(1.15) rotate(2deg)';
  });
  
  item.addEventListener('mouseleave', () => {
    const img = item.querySelector('img');
    img.style.transform = 'scale(1) rotate(0)';
  });
});

// 履历时间线动画
const experienceItems = document.querySelectorAll('.experience__item');

experienceItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.2}s`;
});

// 爱好卡片动画
const hobbyCards = document.querySelectorAll('.hobby__card');

hobbyCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});