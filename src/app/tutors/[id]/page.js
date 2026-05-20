import { use } from 'react';
import TutorDetailsContent from "../../../components/TutorDetailsContent";

export default function TutorDetailsPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  return <TutorDetailsContent id={id} />;
}
