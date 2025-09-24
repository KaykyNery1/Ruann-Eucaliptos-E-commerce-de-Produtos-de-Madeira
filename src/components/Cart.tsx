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
    zipCode: '',
    document: ''
  });
  const [payment, setPayment] = useState({
    method: '',
    cardBrand: ''
  });
  const [addressErrors, setAddressErrors] = useState<{[key: string]: string}>({});
  const [paymentErrors, setPaymentErrors] = useState<{[key: string]: string}>({});

  // CPF validation
  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '');
    
    if (cleanCPF.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanCPF)) return false; // All same digits
    
    // Validate check digits
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.charAt(10))) return false;
    
    return true;
  };

  // CNPJ validation
  const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    if (cleanCNPJ.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false; // All same digits
    
    // Validate first check digit
    const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights1[i];
    }
    let remainder = sum % 11;
    const digit1 = remainder < 2 ? 0 : 11 - remainder;
    if (digit1 !== parseInt(cleanCNPJ.charAt(12))) return false;
    
    // Validate second check digit
    const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cleanCNPJ.charAt(i)) * weights2[i];
    }
    remainder = sum % 11;
    const digit2 = remainder < 2 ? 0 : 11 - remainder;
    if (digit2 !== parseInt(cleanCNPJ.charAt(13))) return false;
    
    return true;
  };

  // Format CPF or CNPJ
  const formatDocument = (value: string): string => {
    const digits = value.replace(/\D/g, '');
    
    if (digits.length <= 11) {
      // Format as CPF
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
      if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    } else {
      // Format as CNPJ
      if (digits.length <= 2) return digits;
      if (digits.length <= 5) return `${digits.slice(0, 2)}.${digits.slice(2)}`;
      if (digits.length <= 8) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
      if (digits.length <= 12) return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
      return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    }
  };

  // Validate document (CPF or CNPJ)
  const validateDocument = (document: string): boolean => {
    const digits = document.replace(/\D/g, '');
    
    if (digits.length === 11) {
      return validateCPF(document);
    } else if (digits.length === 14) {
      return validateCNPJ(document);
    }
    
    return false;
  };

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
    if (!address.document.trim()) errors.document = 'CPF ou CNPJ é obrigatório';
    else if (!validateDocument(address.document)) {
      const digits = address.document.replace(/\D/g, '');
      if (digits.length === 11) {
        errors.document = 'CPF inválido';
      } else if (digits.length === 14) {
        errors.document = 'CNPJ inválido';
      } else {
        errors.document = 'CPF deve ter 11 dígitos ou CNPJ deve ter 14 dígitos';
      }
    }
    
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

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDocument(e.target.value);
    setAddress(prev => ({ ...prev, document: formatted }));
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
    const documentType = address.document.replace(/\D/g, '').length === 11 ? 'CPF' : 'CNPJ';
    message += `*${documentType}:* ${address.document}\n`;
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
      message += `${item.quantity}x ${item.name} - R$ ${item.price.toFixed(2)} cada (${item.weight}kg cada)\n`;
    });
    
    message += `\n*TOTAL: R$ ${state.total.toFixed(2)}*\n`;
    message += `*Peso total: ${state.totalWeight.toFixed(1)}kg*\n\n`;
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
      setAddress({ street: '', number: '', neighborhood: '', city: '', state: 'DF', zipCode: '', document: '' });
      setPayment({ method: '', cardBrand: '' });
      onClose();
      setIsProcessing(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
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
                      <p className="text-xs text-gray-500">{item.weight}kg cada</p>
                      
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
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Peso total:</span>
                <span className="text-sm font-medium text-gray-900">
                  {state.totalWeight.toFixed(1)}kg
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CPF ou CNPJ (para emissão de nota fiscal)</label>
                <input
                  type="text"
                  value={address.document}
                  onChange={handleDocumentChange}
                  maxLength={18}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 ${addressErrors.document ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder="000.000.000-00 ou 00.000.000/0000-00"
                />
                {addressErrors.document && <p className="text-red-600 text-xs mt-1">{addressErrors.document}</p>}
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
                <span className="text-sm text-gray-600">
                  <strong>{address.document.replace(/\D/g, '').length === 11 ? 'CPF' : 'CNPJ'}:</strong> {address.document}
                </span>
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