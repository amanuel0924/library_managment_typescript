import { BookoftheWeek } from "../componets/BookoftheWeek"
import { ContactUs } from "../componets/ContactUs"
import { LibraryCard } from "../componets/LibraryCard"
import { LibraryHoures } from "../componets/LibraryHoures"
import { UpcomingEvents } from "../componets/UpcomingEvents"

export default function Homepage(): JSX.Element {
  return (
    <div>
      <div className=" container flex justify-between   h-full  rounded-md mx-auto">
        <div className=" h-full w-full md:w-3/4 lg:w-3/4 flex flex-col  ">
          <BookoftheWeek />
          <UpcomingEvents />
          <LibraryCard />
        </div>
        <div className=" w-full md:w-1/4 lg:w-1/4 ">
          <LibraryHoures />
          <ContactUs />
        </div>
      </div>
    </div>
  )
}
