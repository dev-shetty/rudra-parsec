declare module "react-scroll" {
  export function animateScroll(config: any): void;
  export interface LinkProps {
    to: string | number;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    delay?: number;
    isDynamic?: boolean;
    ignoreCancelEvents?: boolean;
  }

  export const Link: React.FC<LinkProps>;
}
