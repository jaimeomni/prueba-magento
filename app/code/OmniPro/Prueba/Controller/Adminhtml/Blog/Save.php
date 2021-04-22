<?php

namespace OmniPro\Prueba\Controller\Adminhtml\Blog;

class Save extends \Magento\Backend\App\Action
{
    const ADMIN_RESOURCE = 'OmniPro_Prueba::new';

    /**
     * @var \Magento\Framework\View\Result\PageFactory
     */
    protected $_pageFactory;

    /**
     * @param \OmniPro\Prueba\Api\Data\BlogInterfaceFactory
     */
    private $blogInterfaceFactory;

    /**
     * @param \OmniPro\Prueba\Api\BlogRepositoryInterface
     */
    private $blogRepository;

    /**
     * @param \Magento\Framework\App\Request\DataPersistorInterface
     */
    private $dataPersistor;

    /**
     * @param \Psr\Log\LoggerInterface
     */
    private $logger;

    /**
     * @param \Magento\Backend\App\Action\Context $context
     */
    public function __construct(
        \Magento\Backend\App\Action\Context $context,
        \Magento\Framework\View\Result\PageFactory $pageFactory,
        \OmniPro\Prueba\Api\Data\BlogInterfaceFactory $blogInterfaceFactory,
        \OmniPro\Prueba\Api\BlogRepositoryInterface $blogRepository,
        \Magento\Framework\App\Request\DataPersistorInterface $dataPersistor,
        \Psr\Log\LoggerInterface $logger
    ) {
        $this->_pageFactory = $pageFactory;
        $this->blogInterfaceFactory = $blogInterfaceFactory;
        $this->blogRepository = $blogRepository;
        $this->dataPersistor = $dataPersistor;
        $this->logger = $logger;
        return parent::__construct($context);
    }

    /**
     * Index action
     *
     * @return \Magento\Framework\View\Result\Page
     */
    public function execute()
    {
        $resultRedirect = $this->resultRedirectFactory->create();
        $data = $this->getRequest()->getPostValue();
        $this->logger->debug('omni-blog ' . json_encode($data));
        return $resultRedirect->setPath('*/index');
    }

    /**
     * Is the user allowed to view the page.
     *
     * @return bool
     */
    protected function _isAllowed()
    {
        return $this->_authorization->isAllowed(static::ADMIN_RESOURCE);
    }
}
