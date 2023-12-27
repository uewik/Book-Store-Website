package business.order;

import api.ApiException;
import business.BookstoreDbException;
import business.JdbcUtils;
import business.book.Book;
import business.book.BookDao;
import business.cart.ShoppingCart;
import business.cart.ShoppingCartItem;
import business.customer.Customer;
import business.customer.CustomerDao;
import business.customer.CustomerDaoJdbc;
import business.customer.CustomerForm;

import java.sql.Connection;
import java.sql.SQLException;
import java.time.DateTimeException;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

public class DefaultOrderService implements OrderService {

	private BookDao bookDao;
	private OrderDao orderDao;
	private LineItemDao lineItemDao;
	private CustomerDao customerDao;

	public void setBookDao(BookDao bookDao) {
		this.bookDao = bookDao;
	}
	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}
	public void setLineItemDao(LineItemDao lineItemDao) {
		this.lineItemDao = lineItemDao;
	}
	public void setCustomerDao(CustomerDao customerDao) {
		this.customerDao = customerDao;
	}


	@Override
	public OrderDetails getOrderDetails(long orderId) {
		Order order = orderDao.findByOrderId(orderId);
		Customer customer = customerDao.findByCustomerId(order.customerId());
		List<LineItem> lineItems = lineItemDao.findByOrderId(orderId);
		List<Book> books = lineItems
				.stream()
				.map(lineItem -> bookDao.findByBookId(lineItem.bookId()))
				.toList();
		return new OrderDetails(order, customer, lineItems, books);
	}

	@Override
    public long placeOrder(CustomerForm customerForm, ShoppingCart cart) {

		validateCustomer(customerForm);
		validateCart(cart);

		try (Connection connection = JdbcUtils.getConnection()) {
			Date ccExpDate = customerForm.getCardExpirationDate(
					customerForm.getCcExpiryMonth(),
					customerForm.getCcExpiryYear());
			return performPlaceOrderTransaction(
					customerForm.getName(),
					customerForm.getAddress(),
					customerForm.getPhone(),
					customerForm.getEmail(),
					customerForm.getCcNumber(),
					ccExpDate, cart, connection);
		} catch (SQLException e) {
			throw new BookstoreDbException("Error during close connection for customer order", e);
		}
	}

	private long performPlaceOrderTransaction(String name, String address, String phone, String email, String ccNumber, Date date, ShoppingCart cart, Connection connection) {
		try {
			connection.setAutoCommit(false);
			CustomerDao customerDao = new CustomerDaoJdbc();
			long customerId = customerDao.create(
					connection, name, address, phone, email,
					ccNumber, date);
			OrderDao orderDao = new OrderDaoJdbc();
			long customerOrderId = orderDao.create(
					connection,
					cart.getComputedSubtotal() + cart.getSurcharge(),
					generateConfirmationNumber(), customerId);
			for (ShoppingCartItem item : cart.getItems()) {
				LineItemDao lineItemDao = new LineItemDaoJdbc();
//				lineItemDao.create(connection, customerOrderId,
//						item.getBookId(), item.getQuantity());
				lineItemDao.create(connection, item.getBookId(), customerOrderId,
						 item.getQuantity());
			}
			connection.commit();
			return customerOrderId;
		} catch (Exception e) {
			try {
				connection.rollback();
			} catch (SQLException e1) {
				throw new BookstoreDbException("Failed to roll back transaction", e1);
			}
			return 0;
		}
	}

	private int generateConfirmationNumber() {
		return ThreadLocalRandom.current().nextInt(999999999);
	}


	private void validateCustomer(CustomerForm customerForm) {

    	String name = customerForm.getName();
//		if (name == null || name.equals("") || name.length() > 45 || name.length() < 4) {
//			throw new ApiException.ValidationFailure("Invalid name field");
//		}
		if (name == null || name.equals("")) {
			throw new ApiException.ValidationFailure("name", "Missing name field");
		}

		if (name.length() > 45 || name.length() < 4) {
			throw new ApiException.ValidationFailure("name", "Invalid name field");
		}


		String address = customerForm.getAddress();
		if (address == null || address.equals("")) {
			throw new ApiException.ValidationFailure("address","Invalid address field");
		}

		if (address.length() > 45 || address.length() < 4) {
			throw new ApiException.ValidationFailure("address", "Invalid address field");
		}


		String phone = customerForm.getPhone();
		if (phone == null || phone.equals("")) {
			throw new ApiException.ValidationFailure("phone", "Missing phone field");
		}

//		String phoneDigits = phone.replaceAll("\\D", "");
//		if (phoneDigits.length() != 10) {
//			throw new ApiException.ValidationFailure("phone", "Invalid phone field");
//		}
		String phoneString = phone.replaceAll("[ \\-()]", ""); // Remove spaces, dashes, and parentheses
		if (phoneString.length() != 10 || !phoneString.matches("\\d{10}")) {
			throw new ApiException.ValidationFailure("phone", "Invalid phone number");
		}


		String email = customerForm.getEmail();
		if (email == null || email.equals("")) {
			throw new ApiException.ValidationFailure("email", "Missing email field");
		}

		if (email.contains(" ") || !email.contains("@") || email.charAt(email.length()-1) == '.') {
			throw new ApiException.ValidationFailure("email", "Invalid email field");
		}


		String ccNumber = customerForm.getCcNumber();
		if (ccNumber == null || ccNumber.equals("")) {
			throw new ApiException.ValidationFailure("ccNumber", "Missing credit card number");
		}

		String ccNumberString = ccNumber.replaceAll("[ -]", "");
		if (ccNumberString.length() < 14 || ccNumberString.length() > 16 || !ccNumber.matches("\\d+")) {
			throw new ApiException.ValidationFailure("ccNumber", "Invalid credit card number");
		}

		String ccExpiryMonth = customerForm.getCcExpiryMonth();
		if (ccExpiryMonth == null || ccExpiryMonth.equals("")) {
			throw new ApiException.ValidationFailure("ccExpiryMonth", "Missing credit card expiration month");
		}

		if (!ccExpiryMonth.matches("\\d+")) {
			throw new ApiException.ValidationFailure("ccExpiryMonth", "Invalid credit card expiration month");
		}

		String ccExpiryYear = customerForm.getCcExpiryYear();
		if (ccExpiryYear == null || ccExpiryYear.equals("")) {
			throw new ApiException.ValidationFailure("ccExpiryYear", "Missing credit card expiration year");
		}

		if (expiryDateIsInvalid(customerForm.getCcExpiryMonth(), customerForm.getCcExpiryYear())) {
			throw new ApiException.ValidationFailure("Please enter a valid expiration date.");
//			throw new ApiException.ValidationFailure("CCExpiryDate", "Please enter a valid expiration date.");
		}
	}

	private boolean expiryDateIsInvalid(String ccExpiryMonth, String ccExpiryYear) {

		int month = Integer.parseInt(ccExpiryMonth);
		if (month < 1 || month > 12) {
			throw new ApiException.ValidationFailure("Invalid month");
		}

		int year = Integer.parseInt(ccExpiryYear);

		YearMonth expiryDate = YearMonth.of(year, month);
		YearMonth currentDate = YearMonth.now();

		return expiryDate.isBefore(currentDate);
	}

	private void validateCart(ShoppingCart cart) {

		if (cart.getItems().size() <= 0) {
			throw new ApiException.ValidationFailure("Cart is empty.");
		}

		cart.getItems().forEach(item-> {
			if (item.getQuantity() < 0 || item.getQuantity() > 99) {
				throw new ApiException.ValidationFailure("Invalid quantity");
			}
			Book databaseBook = bookDao.findByBookId(item.getBookId());

			if (databaseBook == null) {
				throw new ApiException.ValidationFailure("Book not found");
			}
			if (item.getBookForm().getPrice() != databaseBook.price()) {
				throw new ApiException.ValidationFailure("Price mismatch");
			}
			if (item.getBookForm().getCategoryId() != databaseBook.categoryId()) {
				throw new ApiException.ValidationFailure("Category mismatch");
			}
		});
	}

}
