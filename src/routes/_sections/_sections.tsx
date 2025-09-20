import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_sections/_sections")({
  component: PathlessLayoutComponent,
});

function PathlessLayoutComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
//
