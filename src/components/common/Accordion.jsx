import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

function AccordionItem({ item, open, onToggle }) {
  const bodyRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState(0);

  useLayoutEffect(() => {
    if (open && bodyRef.current) setMaxHeight(bodyRef.current.scrollHeight);
  }, [open]);

  return (
    <div className={cn('acc', open && 'open')}>
      <button className="acc-q" onClick={onToggle} aria-expanded={open}>
        {item.q}
        <span className="pm">+</span>
      </button>
      <div className="acc-a" style={{ maxHeight: open ? `${maxHeight}px` : 0 }}>
        <div ref={bodyRef}>{item.a}</div>
      </div>
    </div>
  );
}

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}
