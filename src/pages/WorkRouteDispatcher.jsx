import { useParams } from 'react-router-dom';
import ProjectPage from './ProjectPage';
import WorkCategoryPage from './WorkCategoryPage';
import { WORK_CATEGORIES } from '../data/workCategories';

export default function WorkRouteDispatcher() {
  const { slug } = useParams();

  // If matches one of the 5 work disciplines, render the rich WorkCategoryPage
  if (WORK_CATEGORIES[slug]) {
    return <WorkCategoryPage />;
  }

  // Otherwise render the specific project detail page
  return <ProjectPage />;
}
