
export class indexService {
  getResult(id: number) {
    return { code: 200, id, message: 'success' };
  }
  login(name: string, psd: string) {
    if (name !== 'jacksplwxy' || psd !== '111111') {
      return { code: 401, message: 'auth failed' };
    }
    const token = `t:${name}_${psd.slice(0, 1)}_${Math.random().toFixed(2)}`;
    return { code: 200, token, message: 'success' };
  }
}
