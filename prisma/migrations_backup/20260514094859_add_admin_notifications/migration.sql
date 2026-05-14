-- CreateTable
CREATE TABLE "AdminNotification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT,
    "href" TEXT,
    "entityType" TEXT,
    "entityId" TEXT,
    "actorId" TEXT,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminNotification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AdminNotification_createdAt_idx" ON "AdminNotification"("createdAt");

-- CreateIndex
CREATE INDEX "AdminNotification_readAt_idx" ON "AdminNotification"("readAt");

-- CreateIndex
CREATE INDEX "AdminNotification_type_idx" ON "AdminNotification"("type");

-- CreateIndex
CREATE INDEX "AdminNotification_entityType_entityId_idx" ON "AdminNotification"("entityType", "entityId");
