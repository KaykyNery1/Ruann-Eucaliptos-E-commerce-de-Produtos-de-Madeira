import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2, MapPin, User, Mail } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [address, setAddress] = useState({
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: 'DF',
    zipCode: ''
  });
  const [payment, setPayment] = useState({
    method: '',
    cardBrand: ''
  });
  const [addressErrors, setAddressErrors] = useState<{[key: string]: string}>({});
  const [paymentErrors, setPaymentErrors] = useState<{[key: string]: string}>({});

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const validateAddress = () => {
    const errors: {[key: string]: string} = {};
    
    if (!address.street.trim()) errors.street = 'Rua é obrigatória';
    if (!address.number.trim()) errors.number = 'Número é obrigatório';
    if (!address.neighborhood.trim()) errors.neighborhood = 'Bairro é obrigatório';
    if (!address.city.trim()) errors.city = 'Cidade é obrigatória';
    if (!address.zipCode.trim()) errors.zipCode = 'CEP é obrigatório';
    
    setAddressErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors: {[key: string]: string} = {};
    
    if (!payment.method) errors.method = 'Método de pagamento é obrigatório';
    if ((payment.method === 'credit' || payment.method === 'debit') && !payment.cardBrand) {
      errors.cardBrand = 'Bandeira do cartão é obrigatória';
    }
    
    setPaymentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddressSubmit = () => {
    if (validateAddress()) {
      setShowAddressForm(false);
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSubmit = () => {
    if (validatePayment()) {
      setShowPaymentForm(false);
      setShowConfirmation(true);
    }
  };

  const handleCheckout = async () => {
    if (!showAddressForm) {
      setShowAddressForm(true);
      return;
    }
  };

  const confirmOrder = async () => {
    if (!currentUser || state.items.length === 0) return;
    
    setIsProcessing(true);

    // Prepare WhatsApp message
    const customerName = currentUser.displayName || currentUser.email;
    const whatsappNumber = "556199910956";
    
    let message = `*PEDIDO - RUANN EUCALIPTOS*\n\n`;
    message += `*Cliente:* ${customerName}\n`;
    message += `*Email:* ${currentUser.email}\n`;
    message += `*Endereço de Entrega:* ${address.street}, ${address.number}, ${address.neighborhood} - ${address.city}/${address.state}, CEP: ${address.zipCode}\n\n`;
    
    // Add payment method
    let paymentText = '';
    switch (payment.method) {
      case 'pix':
        paymentText = 'PIX';
        break;
      case 'credit':
        paymentText = `Cartão de Crédito (${payment.cardBrand})`;
        break;
      case 'debit':
        paymentText = `Cartão de Débito (${payment.cardBrand})`;
        break;
      case 'cash':
        paymentText = 'Dinheiro';
        break;
    }
    message += `*Forma de Pagamento:* ${paymentText}\n`;
    message += `*Itens do Pedido:*\n`;
    
    state.items.forEach((item) => {
      message += `${item.quantity}x ${item.name} - R$ ${item.price.toFixed(2)} cada\n`;
    });
    
    message += `\n*TOTAL: R$ ${state.total.toFixed(2)}*\n\n`;
    message += `Gostaria de finalizar este pedido. Aguardo retorno para combinar entrega e pagamento.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(url, '_blank');
    
    // Clear cart after successful checkout
    setTimeout(() => {
      clearCart();
      setShowConfirmation(false);
      setShowAddressForm(false);
      setShowPaymentForm(false);
      setAddress({ street: '', number: '', neighborhood: '', city: '', state: 'DF', zipCode: '' });
      setPayment({ method: '', cardBrand: '' });
      onClose();
      setIsProcessing(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Carrinho ({state.items.length})
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Seu carrinho está vazio</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">R$ {item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-gray-900">Total:</span>
                <span className="text-xl font-bold text-emerald-600">
                  R$ {state.total.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                Continuar para Endereço
              </button>
              
              <button
                onClick={clearCart}
                className="w-full mt-2 py-2 px-4 text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Limpar Carrinho
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      {showAddressForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Endereço de Entrega
              </h3>
              <button
                onClick={() => setShowAddressForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rua</label>
                  <input
                    type="text"
                    value={address.street}
                    onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.street ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Nome da rua"
                  />
                  {addressErrors.street && <p className="text-red-600 text-xs mt-1">{addressErrors.street}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Número</label>
                  <input
                    type="text"
                    value={address.number}
                    onChange={(e) => setAddress(prev => ({ ...prev, number: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.number ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="123"
                  />
                  {addressErrors.number && <p className="text-red-600 text-xs mt-1">{addressErrors.number}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bairro</label>
                <input
                  type="text"
                  value={address.neighborhood}
                  onChange={(e) => setAddress(prev => ({ ...prev, neighborhood: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.neighborhood ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="Nome do bairro"
                />
                {addressErrors.neighborhood && <p className="text-red-600 text-xs mt-1">{addressErrors.neighborhood}</p>}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cidade</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.city ? 'border-red-300' : 'border-gray-300'}`}
                    placeholder="Cidade"
                  />
                  {addressErrors.city && <p className="text-red-600 text-xs mt-1">{addressErrors.city}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                  <select
                    value={address.state}
                    onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="DF">DF</option>
                    <option value="GO">GO</option>
                    <option value="MG">MG</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CEP</label>
                <input
                  type="text"
                  value={address.zipCode}
                  onChange={(e) => setAddress(prev => ({ ...prev, zipCode: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.zipCode ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="00000-000"
                />
                {addressErrors.zipCode && <p className="text-red-600 text-xs mt-1">{addressErrors.zipCode}</p>}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddressForm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddressSubmit}
                className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Forma de Pagamento</h3>
              <button
                onClick={() => setShowPaymentForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pagamento</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={payment.method === 'pix'}
                      onChange={(e) => setPayment(prev => ({ ...prev, method: e.target.value, cardBrand: '' }))}
                      className="mr-2"
                    />
                    PIX
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit"
                      checked={payment.method === 'credit'}
                      onChange={(e) => setPayment(prev => ({ ...prev, method: e.target.value }))}
                      className="mr-2"
                    />
                    Cartão de Crédito
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="debit"
                      checked={payment.method === 'debit'}
                      onChange={(e) => setPayment(prev => ({ ...prev, method: e.target.value }))}
                      className="mr-2"
                    />
                    Cartão de Débito
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={payment.method === 'cash'}
                      onChange={(e) => setPayment(prev => ({ ...prev, method: e.target.value, cardBrand: '' }))}
                      className="mr-2"
                    />
                    Dinheiro
                  </label>
                </div>
                {paymentErrors.method && <p className="text-red-600 text-xs mt-1">{paymentErrors.method}</p>}
              </div>

              {(payment.method === 'credit' || payment.method === 'debit') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bandeira do Cartão</label>
                  <select
                    value={payment.cardBrand}
                    onChange={(e) => setPayment(prev => ({ ...prev, cardBrand: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${paymentErrors.cardBrand ? 'border-red-300' : 'border-gray-300'}`}
                  >
                    <option value="">Selecione a bandeira</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="Elo">Elo</option>
                    <option value="American Express">American Express</option>
                    <option value="Hipercard">Hipercard</option>
                  </select>
                  {paymentErrors.cardBrand && <p className="text-red-600 text-xs mt-1">{paymentErrors.cardBrand}</p>}
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPaymentForm(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={handlePaymentSubmit}
                className="flex-1 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Confirmar Pedido</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Customer Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 text-gray-600 mr-2" />
                <span className="font-medium">{currentUser?.displayName || currentUser?.email}</span>
              </div>
              <div className="flex items-center mb-2">
                <Mail className="h-4 w-4 text-gray-600 mr-2" />
                <span className="text-sm text-gray-600">{currentUser?.email}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-gray-600 mr-2 mt-0.5" />
                <div className="text-sm text-gray-600">
                  {address.street}, {address.number}<br />
                  {address.neighborhood} - {address.city}/{address.state}<br />
                  CEP: {address.zipCode}
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Forma de Pagamento:</h4>
              <div className="text-sm text-gray-600">
                {payment.method === 'pix' && 'PIX'}
                {payment.method === 'credit' && `Cartão de Crédito (${payment.cardBrand})`}
                {payment.method === 'debit' && `Cartão de Débito (${payment.cardBrand})`}
                {payment.method === 'cash' && 'Dinheiro'}
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Itens do Pedido:</h4>
              <div className="space-y-2">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span className="text-emerald-600">R$ {state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
              <button
                onClick={confirmOrder}
                disabled={isProcessing}
                className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  'Enviar Pedido'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;