import React from 'react';
import Link from 'next/link';

export default function EmptyState({
  icon: Icon,
  iconColorClass = "bg-primary/10 text-primary",
  iconInnerClass = "",
  title,
  description,
  actionText,
  actionLink,
  onAction,
  maxWidthClass = "max-w-lg"
}) {
  return (
    <div className={`card bg-base-200 border border-base-300 p-12 text-center rounded-2xl ${maxWidthClass} mx-auto space-y-4`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${iconColorClass}`}>
        <Icon className={`h-8 w-8 ${iconInnerClass}`} />
      </div>
      <h3 className="font-extrabold text-2xl text-base-content">
        {title}
      </h3>
      <p className="text-sm text-base-content/65 max-w-sm mx-auto leading-relaxed">
        {description}
      </p>
      {actionLink ? (
        <Link
          href={actionLink}
          className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10"
        >
          {actionText}
        </Link>
      ) : onAction ? (
        <button
          onClick={onAction}
          className="btn btn-primary rounded-xl font-bold px-6 shadow-md shadow-primary/10"
        >
          {actionText}
        </button>
      ) : null}
    </div>
  );
}
