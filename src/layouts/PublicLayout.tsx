import { LayoutProps } from "../common/types";

function PublicLayout({ children }: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}

export default PublicLayout;
