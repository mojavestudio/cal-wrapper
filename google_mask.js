;(function() {
    // find the current <script> tag so we can read its data- attributes
    const me = document.currentScript;
    const url = me.getAttribute('data-booking-url');
    const width = me.getAttribute('data-width') || '100%';
    const height = me.getAttribute('data-height') || '600px';
    const theme = me.getAttribute('data-theme') || 'light';
  
    if (!url) {
      console.error('[BookingMask] data-booking-url is required!');
      return;
    }
  
    // create a wrapper DIV
    const wrapper = document.createElement('div');
    wrapper.style.width  = width;
    wrapper.style.height = height;
    wrapper.style.maxWidth = '100%';
    wrapper.style.position   = 'relative';
    wrapper.style.borderRadius = '8px';
    wrapper.style.overflow     = 'hidden';
    wrapper.style.boxShadow    = theme === 'dark'
      ? '0 4px 16px rgba(0,0,0,0.6)'
      : '0 4px 16px rgba(0,0,0,0.1)';
    // optional loading overlay
    const loader = document.createElement('div');
    loader.innerText = 'Loading…';
    loader.style.position = 'absolute';
    loader.style.top    = '0';
    loader.style.left   = '0';
    loader.style.width  = '100%';
    loader.style.height = '100%';
    loader.style.display = 'flex';
    loader.style.alignItems = 'center';
    loader.style.justifyContent = 'center';
    loader.style.background = theme === 'dark'
      ? 'rgba(0,0,0,0.5)'
      : 'rgba(255,255,255,0.8)';
    wrapper.appendChild(loader);
  
    // create the iframe
    const iframe = document.createElement('iframe');
    iframe.src    = url;
    iframe.width  = '100%';
    iframe.height = '100%';
    iframe.frameBorder = '0';
    iframe.onload = () => loader.remove();
    
    wrapper.appendChild(iframe);
  
    // find a target container (or fallback to inserting before this script)
    const targetId = me.getAttribute('data-target-id');
    const target = targetId
      ? document.getElementById(targetId)
      : me.parentNode;
    target.appendChild(wrapper);
  })();