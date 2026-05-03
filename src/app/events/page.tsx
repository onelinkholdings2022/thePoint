import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import EventsBanner from "@/components/sections/events/EventsBanner";
import EventsHubClient from "@/components/sections/events/EventsHubClient";
import { EventController } from "@/controllers/events/events.controller";


export default async function EventsPage() {
  // Runs on the server — data arrives with the HTML, no client API call needed
  const controller = new EventController();
  const { data: initialData } = await controller.getAllEvents();

  return (
    <main className="min-h-screen bg-main">
      <Navbar />
      <EventsBanner />
      <EventsHubClient initialData={initialData} />
      <Footer />
    </main>
  );
}
