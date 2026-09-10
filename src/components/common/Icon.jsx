import {
  Check,
  GraduationCap,
  Search,
  FileText,
  ShieldCheck,
  Briefcase,
  Coins,
  Shield,
  Clock,
  Home,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronUp,
  Target,
} from 'lucide-react';

const ICONS = {
  check: Check,
  cap: GraduationCap,
  search: Search,
  document: FileText,
  'shield-check': ShieldCheck,
  briefcase: Briefcase,
  coins: Coins,
  shield: Shield,
  clock: Clock,
  home: Home,
  users: Users,
  phone: Phone,
  mail: Mail,
  pin: MapPin,
  'chevron-up': ChevronUp,
  target: Target,
};

export default function Icon({ name, size = 24, strokeWidth = 1.8, className }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} strokeWidth={strokeWidth} className={className} aria-hidden="true" />;
}
