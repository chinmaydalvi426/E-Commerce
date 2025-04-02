export default function Footer() {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">About Us</h3>
            <p className="text-sm">Fashion Store brings you the latest trends in clothing and accessories.</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">New Arrivals</a></li>
              <li><a href="#" className="hover:text-primary">Sale Items</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Store Locator</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary">Facebook</a></li>
              <li><a href="#" className="hover:text-primary">Instagram</a></li>
              <li><a href="#" className="hover:text-primary">Twitter</a></li>
              <li><a href="#" className="hover:text-primary">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Fashion Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

