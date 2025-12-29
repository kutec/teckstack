import TwoColLayout from '@/layouts/TwoColLayout';
import PostSidebar from '@/components/PostSidebar';
import Pagination from '@/components/Pagination';
import { getGuides } from '@/lib/wp';
import PostsListClient from '@/components/PostsListClient';

export default async function GuidesPage() {
    const guides = await getGuides(12).catch(() => []);
    const total = guides.length; // until meta pagination added

    return (
        <>
            <PostsListClient initialPosts={guides} total={total} basePath="guides" title="All Guides" />
        </>
    );
}
