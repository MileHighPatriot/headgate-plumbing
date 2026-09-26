import Link from "next/link";
import Icon from "@/components/Icon";
import { site } from "@/data/site";

/** Fixed bottom bar on phones: emergency call (red) + quieter booking. */
export default function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-chalk/95 p-2.5 backdrop-blur lg:hidden [padding-bottom:max(0.625rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-[1.35fr_1fr] gap-2">
        <a href={site.phoneHref} className="btn btn-alert min-h-12">
          <Icon name="phone" className="h-4 w-4" />
          Emergency call
        </a>
        <Link href="/book/" className="btn btn-ink min-h-12">
          Book a visit
        </Link>
      </div>
    </div>
  );
}
