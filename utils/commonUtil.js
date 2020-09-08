/**
 * @author llycc
 * @date 2020-08-29
 * */

/**
 * @desc 函数防抖，在函数调用的一定时间后执行，如果这段时间内函数再次被调用则重新计时
 * @param{function} fn 需要防抖的函数
 * @param{number} delayMs 延时时长，单位：毫秒 默认100
 * @return{function} 防抖后的新函数
 * */
export function debounce(fn, delayMs = 100) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, delayMs);
  };
}

/**
 * @desc 函数节流 函数会被立即执行，但是再执行完成后的指定时间内不能再次执行
 * @param{function} fn 需要节流的函数
 * @param{number} intervalMs 间隔时间 单位：毫秒  默认100
 * @return{function} 节流后的函数
 * */
export function throttle(fn, intervalMs = 100) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      return;
    }
    fn(...args);
    timer = setTimeout(() => {
      timer = null;
    }, intervalMs);
  }
}
/**
 * @desc 验证邮箱：只允许英文字母、数字、下划线、英文句号、以及中划线组成
 * @param {string} email
 * @return {boolean} email地址是否有效
 * */
export function isValidEmail(email) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(email)
}
