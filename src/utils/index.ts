export const onlyChild = (children: React.ReactNode): any =>
  Array.isArray(children) ? children[0] : children;
