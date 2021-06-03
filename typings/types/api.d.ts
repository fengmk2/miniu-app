/**
 * @file api 补充
 */

declare namespace my {
  interface IGetOpenUserInfoOptions {
    /**
     * 获取用户信息成功回调
     */
    success?: (res?: any) => void;
    /**
     * 获取用户信息失败回调
     */
    fail?(): void;
    /**
     * 调用结束的回调函数（调用成功、失败都会执行）
     */
    complete?(): void;
  }
  function getOpenUserInfo(options: IGetOpenUserInfoOptions): void;
}
