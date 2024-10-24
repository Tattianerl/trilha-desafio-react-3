export interface IFormDataSignup {
    name: string; 
    email: string;
    password: string; 
    confirmarSenha: string; 
  }

  interface IFormDataSignupFull extends IFormDataSignup {
    confirmarSenha: string;
  }
  